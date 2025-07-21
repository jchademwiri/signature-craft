"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { SignatureBuilder } from "@/components/signature/SignatureBuilder";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

export default function BuilderPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
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
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex-shrink-0">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard" className="flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                <span className="font-semibold text-lg">SignatureCraft</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <h1 className="text-xl font-bold tracking-tight">
                  Build Your Signature
                </h1>
                <p className="text-sm text-muted-foreground">
                  Create a professional email signature in just a few clicks
                </p>
              </div>
              <span className="text-sm text-muted-foreground">
                Welcome, {session.user.name}
              </span>
            </div>
          </div>
        </Container>
      </header>

      <main className="flex-1 overflow-hidden">
        <Container className="h-full py-4">
          <SignatureBuilder />
        </Container>
      </main>
    </div>
  );
}