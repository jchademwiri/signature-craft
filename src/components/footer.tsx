"use client";

import Link from "next/link";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted/30">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">SignatureCraft</h3>
            <p className="text-sm text-muted-foreground">
              Professional email signatures made simple. Create, customize, and deploy with ease.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Product</h4>
            <div className="space-y-2">
              <Link href="#" className="text-sm text-muted-foreground hover:underline block">
                Features
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline block">
                Templates
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline block">
                Pricing
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline block">
                API
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Support</h4>
            <div className="space-y-2">
              <Link href="#" className="text-sm text-muted-foreground hover:underline block">
                Help Center
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline block">
                Contact Us
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline block">
                Status
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline block">
                Community
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <NewsletterSignup />
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SignatureCraft. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}