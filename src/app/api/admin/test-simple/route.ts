import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Simple test received:', body);

    return NextResponse.json({
      status: 'OK',
      received: body,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Simple test failed:', error);
    return NextResponse.json(
      {
        status: 'ERROR',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
