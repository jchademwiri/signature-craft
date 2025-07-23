import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { testDataConfigs } from '@/db/schema';

export async function GET(request: NextRequest) {
  try {
    console.log('Testing database connection...');

    // Test auth
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    console.log('Session test:', session ? 'OK' : 'FAILED');

    if (!session) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          auth: 'FAILED',
        },
        { status: 401 }
      );
    }

    // Test database connection
    const testQuery = await db.select().from(testDataConfigs).limit(1);
    console.log('Database test: OK');

    return NextResponse.json({
      status: 'OK',
      auth: 'OK',
      database: 'OK',
      userId: session.user.id,
      testQuery: testQuery.length,
    });
  } catch (error) {
    console.error('Connection test failed:', error);
    return NextResponse.json(
      {
        status: 'ERROR',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
