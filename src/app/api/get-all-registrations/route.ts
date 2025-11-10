import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Registration from '@/models/Registration';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const registrations = await Registration.find({})
      .sort({ createdAt: -1 })
      .select('email token submitted createdAt updatedAt fullName title office country numberOfChildren date day')
      .lean();

    // Get base URL from request
    const origin = request.nextUrl.origin;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || origin;

    const response = NextResponse.json({
      registrations: registrations.map((reg) => ({
        email: reg.email,
        token: reg.token,
        submitted: reg.submitted,
        createdAt: reg.createdAt,
        updatedAt: reg.updatedAt,
        link: `${baseUrl}/registration/${reg.token}`,
        fullName: reg.fullName || '',
        title: reg.title || '',
        office: reg.office || '',
        country: reg.country || '',
        numberOfChildren: reg.numberOfChildren || '',
        date: reg.date || '',
        day: reg.day || '',
      })),
    });

    // Prevent caching to ensure fresh data
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (error) {
    console.error('Error in get-all-registrations:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

