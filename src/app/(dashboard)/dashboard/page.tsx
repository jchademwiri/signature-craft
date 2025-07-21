'use client';

import { useSession, signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Plus, LogOut, FileText, Settings, Trash2 } from 'lucide-react';
import Link from 'next/link';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';

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
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [dialogOpenId, setDialogOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session) {
      fetchSignatures();
    }
  }, [session]);

  const fetchSignatures = async () => {
    try {
      const response = await fetch('/api/signatures');
      if (response.ok) {
        const data = await response.json();
        setSignatures(data);
      }
    } catch (error) {
      console.error('Failed to fetch signatures:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/signatures?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setSignatures((prev) => prev.filter((s) => s.id !== id));
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to delete signature');
      }
      /* eslint-disable @typescript-eslint/no-unused-vars */
    } catch (error) {
      alert('Failed to delete signature. Please try again.');
      /* eslint-enable @typescript-eslint/no-unused-vars */
    } finally {
      setDeletingId(null);
      setDialogOpenId(null);
    }
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
      <main className="py-8">
        <Container>
          <div className="container mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Welcome to your dashboard</h1>
              <p className="text-muted-foreground">
                Create and manage your professional email signatures
              </p>
            </div>

            {/* Main Action Card */}
            <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 hover:shadow-lg hover:scale-[1.01] transition-all duration-200 cursor-pointer group">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-200">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-200">
                  Create Your Professional Signature
                </CardTitle>
                <CardDescription className="text-base">
                  Build a professional email signature in just 3 clicks
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Button
                  size="lg"
                  asChild
                  className="w-full sm:w-auto h-12 lg:h-11 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 text-white"
                  aria-label="Create a new professional email signature"
                >
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
                    <Card
                      key={signature.id}
                      className="hover:shadow-lg hover:border-primary/30 hover:scale-[1.01] transition-all duration-200 cursor-pointer group"
                      role="button"
                      tabIndex={0}
                      aria-label={`Edit signature for ${signature.name}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          window.location.href = `/builder?edit=${signature.id}`;
                        }
                      }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-1 flex-1">
                            <h3 className="font-medium group-hover:text-primary transition-colors duration-200">
                              {signature.name}
                            </h3>
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
                          <div className="flex items-center gap-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200 h-12 w-12 sm:h-10 sm:w-auto focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                              asChild
                              aria-label={`Edit signature for ${signature.name}`}
                            >
                              <Link href={`/builder?edit=${signature.id}`}>
                                <span className="hidden sm:inline">Edit</span>
                                <span className="sm:hidden">✏️</span>
                              </Link>
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-12 w-12 sm:h-10 sm:w-auto opacity-60 cursor-not-allowed"
                              disabled
                              aria-label="Export coming soon"
                              title="Export coming soon"
                            >
                              <span className="hidden sm:inline">Export</span>
                              <span className="sm:hidden">⏳</span>
                            </Button>
                            <AlertDialog
                              open={dialogOpenId === signature.id}
                              onOpenChange={(open) => setDialogOpenId(open ? signature.id : null)}
                            >
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="h-12 w-12 sm:h-10 sm:w-auto focus-visible:ring-2 focus-visible:ring-destructive focus-visible:ring-offset-2"
                                  aria-label={`Delete signature for ${signature.name}`}
                                  title="Delete signature"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setDialogOpenId(signature.id);
                                  }}
                                  disabled={deletingId === signature.id}
                                >
                                  {deletingId === signature.id ? (
                                    <span className="flex items-center">
                                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></span>
                                      Deleting...
                                    </span>
                                  ) : (
                                    <>
                                      <Trash2 className="h-4 w-4 mr-1" />{' '}
                                      <span className="hidden sm:inline">Delete</span>
                                    </>
                                  )}
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Signature</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this signature? This action
                                    cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel asChild>
                                    <Button variant="outline" type="button">
                                      Cancel
                                    </Button>
                                  </AlertDialogCancel>
                                  <AlertDialogAction asChild>
                                    <Button
                                      variant="destructive"
                                      type="button"
                                      onClick={() => handleDelete(signature.id)}
                                      disabled={deletingId === signature.id}
                                    >
                                      {deletingId === signature.id ? 'Deleting...' : 'Delete'}
                                    </Button>
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <Card className="hover:shadow-lg hover:border-primary/20 transition-all duration-200">
                <CardContent className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No signatures yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Create your first professional email signature to get started
                  </p>
                  <Button
                    asChild
                    className="h-12 lg:h-10 transition-colors duration-200 bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    aria-label="Create your first professional email signature"
                  >
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
