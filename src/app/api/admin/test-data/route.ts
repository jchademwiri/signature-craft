import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { testDataConfigs } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

// GET - Fetch all test data configurations for the user
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const configs = await db
      .select()
      .from(testDataConfigs)
      .where(eq(testDataConfigs.userId, session.user.id))
      .orderBy(testDataConfigs.createdAt);

    return NextResponse.json({ configs });
  } catch (error) {
    console.error('Error fetching test data configs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch test data configurations' },
      { status: 500 }
    );
  }
}

// POST - Create or update test data configuration
export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/admin/test-data - Starting request');

    const session = await auth.api.getSession({
      headers: request.headers,
    });

    console.log('Session:', session ? 'Found' : 'Not found');

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    console.log('Request body:', body);

    const {
      id,
      name,
      description,
      testName,
      testTitle,
      testCompany,
      testEmail,
      testPhone,
      testWebsite,
      testLogoData,
      testPrimaryColor,
      testSecondaryColor,
      isDefault,
    } = body;

    // Validate required fields
    if (!name || !testName || !testEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: name, testName, testEmail' },
        { status: 400 }
      );
    }

    // If setting as default, unset other defaults first
    if (isDefault) {
      await db
        .update(testDataConfigs)
        .set({ isDefault: false })
        .where(eq(testDataConfigs.userId, session.user.id));
    }

    let config;

    if (id) {
      console.log('Updating existing config:', id);
      // Update existing configuration
      config = await db
        .update(testDataConfigs)
        .set({
          name,
          description,
          testName,
          testTitle,
          testCompany,
          testEmail,
          testPhone,
          testWebsite,
          testLogoData,
          testPrimaryColor: testPrimaryColor || '#4285f4',
          testSecondaryColor: testSecondaryColor || '#9aa0a6',
          isDefault: isDefault || false,
          updatedAt: new Date(),
        })
        .where(and(eq(testDataConfigs.id, id), eq(testDataConfigs.userId, session.user.id)))
        .returning();
    } else {
      console.log('Creating new config');
      // Create new configuration
      config = await db
        .insert(testDataConfigs)
        .values({
          id: crypto.randomUUID(),
          userId: session.user.id,
          name,
          description,
          testName,
          testTitle,
          testCompany,
          testEmail,
          testPhone,
          testWebsite,
          testLogoData,
          testPrimaryColor: testPrimaryColor || '#4285f4',
          testSecondaryColor: testSecondaryColor || '#9aa0a6',
          isDefault: isDefault || false,
        })
        .returning();
    }

    console.log('Config saved:', config[0]);
    return NextResponse.json({ config: config[0] });
  } catch (error) {
    console.error('Error saving test data config:', error);
    return NextResponse.json(
      {
        error: 'Failed to save test data configuration',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
