'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function HeroSection() {
  return (
    <section className="py-12 md:py-24">
      <div className="flex flex-col items-center text-center space-y-8">
        <div className="mb-4 relative">
          <Image
            src="/logo.svg"
            alt="SignatureCraft Logo"
            width={300}
            height={75}
            priority
            className="dark:hidden"
          />
          <Image
            src="/logo-dark.svg"
            alt="SignatureCraft Logo (Dark)"
            width={300}
            height={75}
            priority
            className="hidden dark:block"
          />
        </div>

        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Professional Email Signatures <span className="text-primary">in 3 Clicks</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
            Create professional email signatures in under 5 minutes. No design skills required.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button size="lg" asChild className="text-white">
            <Link href="/builder">Create Your Signature</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/templates">View Templates</Link>
          </Button>
        </div>

        <div className="mt-8 text-sm text-muted-foreground">
          <p>✓ No credit card required • ✓ Free to start • ✓ 3 professional templates</p>
        </div>

        <Separator className="max-w-md mt-12" />
      </div>
    </section>
  );
}
