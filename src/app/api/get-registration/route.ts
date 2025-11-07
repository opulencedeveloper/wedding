import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Registration from '@/models/Registration';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Token is required' },
        { status: 400 }
      );
    }

    const registration = await Registration.findOne({ token });

    if (!registration) {
      return NextResponse.json(
        { error: 'invalid_link' },
        { status: 404 }
      );
    }

    // Check if already submitted
    if (registration.submitted) {
      return NextResponse.json(
        { error: 'You have already submitted an invitation and the link has been used' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      email: registration.email,
      fullName: registration.fullName || '',
      title: registration.title || '',
      office: registration.office || '',
      country: registration.country || '',
      numberOfChildren: registration.numberOfChildren || '',
    });
  } catch (error) {
    console.error('Error in get-registration:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
