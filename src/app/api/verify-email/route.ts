import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import connectDB from '@/lib/mongodb';
import Registration from '@/models/Registration';
import { sendInvitationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existing = await Registration.findOne({ email });

    if (existing && existing.token) {
      // Email already has an invitation link, prevent duplicate generation
      return NextResponse.json(
        { error: 'An invitation link already exists for this email address.' },
        { status: 409 }
      );
    }

    // Generate unique token first (needed for invitation link)
    const token = randomBytes(32).toString('hex');

    // Get base URL from request and ensure it's properly formatted
    const origin = request.nextUrl.origin;
    let baseUrl = process.env.NEXT_PUBLIC_BASE_URL || origin;
    // Remove trailing slash if present
    baseUrl = baseUrl.replace(/\/$/, '');
    // Ensure the invitation link points to the registration page
    const invitationLink = `${baseUrl}/invitation/${token}`;

    // Send invitation email FIRST - only proceed if email succeeds
    try {
      await sendInvitationEmail(email, invitationLink, baseUrl);
    } catch (emailError) {
      console.error('Failed to send invitation email:', emailError);
      // If email fails, don't create the document
      return NextResponse.json(
        { error: 'Failed to send invitation email. Please try again later.' },
        { status: 500 }
      );
    }

    // Only create document if email was sent successfully
    const newRegistration = new Registration({
      email,
      token,
      fullName: '',
      title: '',
      office: '',
      country: '',
      numberOfChildren: '',
      submitted: false,
    });

    await newRegistration.save();

    // Return the full registration object
    return NextResponse.json({
      email: newRegistration.email,
      token: newRegistration.token,
      submitted: newRegistration.submitted,
      createdAt: newRegistration.createdAt,
      updatedAt: newRegistration.updatedAt,
      link: invitationLink,
      fullName: newRegistration.fullName || '',
      title: newRegistration.title || '',
      office: newRegistration.office || '',
      country: newRegistration.country || '',
      numberOfChildren: newRegistration.numberOfChildren || '',
      exists: false,
    });
  } catch (error: any) {
    console.error('Error in verify-email:', error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      // If token is duplicate, try again
      if (error.keyPattern?.token) {
        return NextResponse.json(
          { error: 'Please try again' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
