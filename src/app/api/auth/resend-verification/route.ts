import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { Resend } from 'resend';
import WelcomeEmail from '@/emails/welcome';
import React from 'react';

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Get the latest user data
    const userResult = await db.select().from(users).where(eq(users.id, session.user.id)).limit(1);
    const user = userResult[0];
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    if (user.emailVerified) {
      return NextResponse.json({ error: 'Email is already verified.' }, { status: 400 });
    }
    // Generate a verification URL (simulate what better-auth does)
    // In a real app, you may want to trigger the same logic as sendVerificationEmail in your auth config
    // For now, just send the same email again
    const resend = new Resend(process.env.RESEND_API_KEY);
    // You may need to generate a new token and URL here. For now, just use a placeholder URL.
    const verificationUrl = `${process.env.BETTER_AUTH_URL || 'http://localhost:3000'}/verify?email=${encodeURIComponent(user.email)}`;
    await resend.emails.send({
      from: 'SignatureCraft <noreply@playhousemedia.net>',
      to: user.email,
      subject: 'Verify your email address',
      react: React.createElement(WelcomeEmail, {
        name: user.name || user.email,
        verificationUrl,
      }),
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error resending verification email:', error);
    return NextResponse.json({ error: 'Failed to resend verification email.' }, { status: 500 });
  }
}
