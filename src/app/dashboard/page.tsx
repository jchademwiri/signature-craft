"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";
import { Plus, User, LogOut, FileText, Settings } from "lucide-react";
import Link from "next/link";

interface Signature {
  id: string;
  name: string;
  title?: string;
  company?: string;
  email: string;
  templateId: string;
  createdAt: string;
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [signatures, setSignatures] = useState<Signature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session) {
      fetchSignatures();
    }
  }, [session]);

  const fetchSignatures = async () => {
    try {
      const response = await fetch("/api/signatures");
      if (response.ok) {
        const data = await response.json();
        setSignatures(data);
      }
    } catch (error) {
      console.error("Failed to fetch signatures:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  if (isPending || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container>
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              <span className="font-semibold text-lg">SignatureCraft</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {session.user.name}
              </span>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/settings" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </Container>
      </header>

      <main className="py-8">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome to your dashboard
              </h1>
              <p className="text-muted-foreground">
                Create and manage your professional email signatures
              </p>
            </div>

            {/* Main Action Card */}
            <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Create Your Professional Signature</CardTitle>
                <CardDescription className="text-base">
                  Build a professional email signature in just 3 clicks
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button size="lg" asChild className="w-full sm:w-auto h-12 lg:h-11 transition-colors duration-200 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href="/builder">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Signature
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Existing Signatures */}
            {loading ? (
              <Card>
                <CardContent className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </CardContent>
              </Card>
            ) : signatures.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Your Signatures</h2>
                  <span className="text-sm text-muted-foreground">
                    {signatures.length} signature{signatures.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="grid gap-4">
                  {signatures.map((signature) => (
                    <Card key={signature.id} className="hover:shadow-md hover:border-primary/20 transition-all duration-200 cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <h3 className="font-medium">{signature.name}</h3>
                            {signature.title && signature.company && (
                              <p className="text-sm text-muted-foreground">
                                {signature.title} at {signature.company}
                              </p>
                            )}
                            <p className="text-sm text-muted-foreground">{signature.email}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                                {signature.templateId}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                Created {new Date(signature.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200 h-10" asChild>
                              <Link href={`/builder?edit=${signature.id}`}>
                                Edit
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200 h-10" asChild>
                              <Link href={`/export?id=${signature.id}`}>
                                Export
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No signatures yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Create your first professional email signature to get started
                  </p>
                  <Button asChild className="h-12 lg:h-10 transition-colors duration-200 bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link href="/builder">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Signature
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}


          </div>
        </Container>
      </main>
    </div>
  );
}