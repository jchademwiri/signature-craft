import { auth } from '@/lib/auth';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, email } = body;

    // Basic validation
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // If the email is changed, use Better Auth's changeEmail API
    if (email !== session.user.email) {
      // This will trigger the sendChangeEmailVerification logic
      await auth.api.changeEmail({
        userId: session.user.id,
        newEmail: email,
        callbackURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
      });
      // Only update the name directly
      await db
        .update(users)
        .set({ name: name.trim(), updatedAt: new Date() })
        .where(eq(users.id, session.user.id));
      return NextResponse.json({
        message:
          'A verification email has been sent to your new address. Please verify to complete the change.',
      });
    }

    // If only the name is changed
    const updatedUser = await db
      .update(users)
      .set({ name: name.trim(), updatedAt: new Date() })
      .where(eq(users.id, session.user.id))
      .returning();

    if (updatedUser.length === 0) {
      return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser[0].id,
        name: updatedUser[0].name,
        email: updatedUser[0].email,
      },
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
