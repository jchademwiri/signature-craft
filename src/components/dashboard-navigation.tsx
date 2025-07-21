"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { FileText, Settings, LogOut, Menu } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import * as React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

interface DashboardNavigationProps {
  session: { user: { name: string } };
  handleLogout: () => void;
}

export function DashboardNavigation({ session, handleLogout }: DashboardNavigationProps) {
  const { resolvedTheme } = useTheme();
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center" aria-label="Dashboard Home">
            {/* Light mode logo */}
            <Image
              src="/logo.svg"
              alt="SignatureCraft Logo"
              width={36}
              height={36}
              priority
              className="h-9 w-auto block dark:hidden"
            />
            {/* Dark mode logo */}
            <Image
              src="/logo-dark.svg"
              alt="SignatureCraft Logo Dark"
              width={36}
              height={36}
              priority
              className="h-9 w-auto hidden dark:block"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline-block">
              Welcome, {session.user.name}
            </span>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-3 py-2 text-xs text-muted-foreground">
                  Welcome, {session.user.name}
                </div>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Container>
    </header>
  );
} 