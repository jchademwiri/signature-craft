import React from 'react';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import * as schema from '@/db/schema';
import { db } from '@/db';

import { Resend } from 'resend';
import PasswordResetEmail from '@emails/password-reset';
// import { PasswordResetEmail } from '../../emails/password-reset';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
    schema: {
      users: schema.users,
      sessions: schema.sessions,
      accounts: schema.accounts,
      verifications: schema.verifications,
    },
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // MVP: Skip verification
    sendResetPassword: async ({ user, url, token }) => {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'SignatureCraft <noreply@playhousemedia.net>',
        to: user.email,
        subject: 'Reset your password',
        react: React.createElement(PasswordResetEmail, {
          name: user.name || user.email,
          resetUrl: url,
        }),
      });
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
});
