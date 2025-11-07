import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';
import connectDB from '@/lib/mongodb';
import Registration from '@/models/Registration';

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

    // Generate unique token
    const token = randomBytes(32).toString('hex');

    // Create new document with empty strings
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

    // Get base URL from request
    const origin = request.nextUrl.origin;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || origin;

    // Return the full registration object
    return NextResponse.json({
      email: newRegistration.email,
      token: newRegistration.token,
      submitted: newRegistration.submitted,
      createdAt: newRegistration.createdAt,
      updatedAt: newRegistration.updatedAt,
      link: `${baseUrl}/registration/${newRegistration.token}`,
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
