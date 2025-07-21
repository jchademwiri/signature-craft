'use client';

import { useSession } from '@/lib/auth-client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Container } from '@/components/ui/container';
import { SignatureBuilder } from '@/components/signature/SignatureBuilder';

export default function BuilderPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  if (isPending || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      <main className="flex-1 overflow-hidden">
        <Container className="h-full py-4">
          <SignatureBuilder editId={editId || undefined} />
        </Container>
      </main>
    </div>
  );
}
