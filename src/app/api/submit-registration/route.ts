import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Registration from '@/models/Registration';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const data = await request.json();
    const { email, fullName, title, office, country, numberOfChildren, date, day } = data;

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Find existing registration by email
    const existing = await Registration.findOne({ email });

    if (!existing) {
      return NextResponse.json(
        { error: 'Registration not found. Please verify your email first.' },
        { status: 404 }
      );
    }

    if (existing.submitted) {
      return NextResponse.json(
        { error: 'This registration has already been submitted' },
        { status: 400 }
      );
    }

    // Update the document
    existing.fullName = fullName || '';
    existing.title = title || '';
    existing.office = office || '';
    existing.country = country || '';
    existing.numberOfChildren = numberOfChildren || '';
    existing.date = date || '';
    existing.day = day || '';
    existing.submitted = true;

    await existing.save();

    return NextResponse.json({
      success: true,
      message: 'Registration submitted successfully',
    });
  } catch (error) {
    console.error('Error in submit-registration:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
