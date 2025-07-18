"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function HeroSection() {
  return (
    <section className="py-12 md:py-24">
      <div className="flex flex-col items-center text-center space-y-8">
        <div className="mb-4">
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
            alt="SignatureCraft Logo" 
            width={300} 
            height={75} 
            priority
            className="hidden dark:block"
          />
        </div>
        
        <div className="space-y-4 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            Professional Email Signatures <span className="text-primary">Made Simple</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
            Create, customize, and deploy professional email signatures with logos, social links, and banners.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <Button size="lg">Get Started</Button>
          <Button size="lg" variant="outline">View Templates</Button>
        </div>
        
        <Separator className="max-w-md mt-12" />
      </div>
    </section>
  );
}