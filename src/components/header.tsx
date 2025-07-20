"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-background/80 dark:bg-background/70 border-b border-border shadow-sm transition-colors">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity duration-200" aria-label="Go to SignatureCraft homepage">
          <Image 
            src="/logo.svg" 
            alt="SignatureCraft Logo" 
            width={120} 
            height={32} 
            priority
            className="dark:hidden w-[120px] h-[32px] sm:w-[150px] sm:h-[40px]"
          />
          <Image 
            src="/logo-dark.svg" 
            alt="SignatureCraft Logo" 
            width={120} 
            height={32} 
            priority
            className="hidden dark:block w-[120px] h-[32px] sm:w-[150px] sm:h-[40px]"
          />
        </Link>
        
        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label="Main navigation">
          <Link 
            href="#features" 
            className="text-sm font-medium hover:underline hover:text-primary transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="View features section"
          >
            Features
          </Link>
          <Link 
            href="#pricing" 
            className="text-sm font-medium hover:underline hover:text-primary transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="View pricing section"
          >
            Pricing
          </Link>
          <Link 
            href="#templates" 
            className="text-sm font-medium hover:underline hover:text-primary transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            aria-label="View templates section"
          >
            Templates
          </Link>
          <ThemeToggle />
          <div className="flex items-center gap-2 ml-4">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-10 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" 
              asChild
            >
              <Link href="/login" aria-label="Sign in to your account">Sign In</Link>
            </Button>
            <Button 
              size="sm" 
              className="h-10 transition-colors duration-200 text-white focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" 
              asChild
            >
              <Link href="/register" aria-label="Create a new account">Get Started</Link>
            </Button>
          </div>
        </nav>
        
        {/* Mobile nav */}
        <div className="md:hidden flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-12 w-12 transition-colors duration-200 hidden sm:flex focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" 
            asChild
          >
            <Link href="/login" aria-label="Sign in to your account">Sign In</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-12 w-12 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" 
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-64 mr-2 mt-2 p-2"
              sideOffset={8}
            >
              <DropdownMenuItem asChild className="sm:hidden h-12">
                <Link href="/login" className="flex items-center gap-3 py-3 text-base">
                  Sign In
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="h-12">
                <Link href="/register" className="flex items-center gap-3 py-3 text-base font-medium">
                  Get Started
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="h-12">
                <Link href="#features" className="flex items-center gap-3 py-3 text-base">
                  Features
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="h-12">
                <Link href="#pricing" className="flex items-center gap-3 py-3 text-base">
                  Pricing
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="h-12">
                <Link href="#templates" className="flex items-center gap-3 py-3 text-base">
                  Templates
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="h-12">
                <div className="w-full flex justify-center py-3">
                  <ThemeToggle />
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}