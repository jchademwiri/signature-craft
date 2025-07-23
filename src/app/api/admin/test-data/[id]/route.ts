import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { testDataConfigs } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

// DELETE - Delete a test data configuration
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = params;

    await db
      .delete(testDataConfigs)
      .where(and(eq(testDataConfigs.id, id), eq(testDataConfigs.userId, session.user.id)));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting test data config:', error);
    return NextResponse.json(
      { error: 'Failed to delete test data configuration' },
      { status: 500 }
    );
  }
}
