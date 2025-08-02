'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardContent className="p-8 text-center space-y-6">
          {/* Large 404 Text */}
          <div className="space-y-2">
            <h1 className="text-8xl font-black text-slate-200 select-none">404</h1>
            <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          </div>

          {/* Error Message */}
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-slate-800">Page Not Found</h2>
            <p className="text-slate-600 leading-relaxed">
              The page you're looking for doesn't exist or has been moved to a different location.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button asChild className="flex-1">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Go Home
              </Link>
            </Button>

            <Button variant="outline" asChild className="flex-1">
              <Link href="/search">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Link>
            </Button>
          </div>

          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="w-full text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>

          {/* Helpful Links */}
          <div className="pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-500 mb-3">Popular pages:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                href="/about"
                className="text-sm text-slate-600 hover:text-slate-800 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-500 transition-colors"
              >
                About
              </Link>
              <span className="text-slate-300">•</span>
              <Link
                href="/contact"
                className="text-sm text-slate-600 hover:text-slate-800 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-500 transition-colors"
              >
                Contact
              </Link>
              <span className="text-slate-300">•</span>
              <Link
                href="/help"
                className="text-sm text-slate-600 hover:text-slate-800 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-500 transition-colors"
              >
                Help
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
