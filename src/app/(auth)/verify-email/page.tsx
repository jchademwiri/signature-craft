'use client';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function VerifyEmailPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleResend = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const res = await fetch('/api/auth/resend-verification', { method: 'POST' });
      if (res.ok) {
        setMessage('Verification email resent! Please check your inbox.');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to resend verification email.');
      }
    } catch {
      setError('Failed to resend verification email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Verify your email address
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-6">
          Registration successful!
          <br />
          Please check your email and click the verification link to activate your account.
        </p>
        <Button
          type="button"
          className="w-full text-white"
          onClick={handleResend}
          disabled={loading}
        >
          {loading ? 'Resending...' : 'Resend verification email'}
        </Button>
        {message && <p className="mt-4 text-green-600">{message}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </Container>
  );
}
