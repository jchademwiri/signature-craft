import React from 'react';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { createAuthMiddleware } from 'better-auth/api';

import * as schema from '@/db/schema';
import { db } from '@/db';

import { Resend } from 'resend';
import PasswordResetEmail from '@emails/password-reset';
import WelcomeEmail from '@emails/welcome';
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
    requireEmailVerification: true, // Enable verification
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
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'SignatureCraft <noreply@playhousemedia.net>',
        to: user.email,
        subject: 'Verify your email address',
        react: React.createElement(WelcomeEmail, {
          name: user.name || user.email,
          verificationUrl: url,
        }),
      });
    },
  },
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, newEmail, url, token }) => {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'SignatureCraft <noreply@playhousemedia.net>',
          to: user.email,
          subject: 'Approve your email change',
          react: React.createElement(WelcomeEmail, {
            name: user.name || user.email,
            verificationUrl: url,
          }),
        });
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      // Check if this is the email verification endpoint and the user was just verified
      if (ctx.path === '/verify/email' && ctx.context?.user?.emailVerified) {
        const { user } = ctx.context;
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
          from: 'SignatureCraft <noreply@playhousemedia.net>',
          to: user.email,
          subject: 'Welcome to SignatureCraft!',
          react: React.createElement(WelcomeEmail, {
            name: user.name || user.email,
            verificationUrl: '', // Not needed for welcome
          }),
        });
      }
    }),
  },
});
