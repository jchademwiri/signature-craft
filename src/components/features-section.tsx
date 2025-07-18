"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Palette, 
  Users, 
  Share2, 
  Image as ImageIcon, 
  BarChart, 
  Download 
} from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Drag & Drop Builder",
      description: "Responsive signature builder with intuitive drag-and-drop interface",
      icon: <Palette className="h-6 w-6" />
    },
    {
      title: "Brand Integration",
      description: "Logo and avatar uploads with banner support and custom branding",
      icon: <ImageIcon className="h-6 w-6" />
    },
    {
      title: "Social Media",
      description: "Seamless integration with all popular social media platforms",
      icon: <Share2 className="h-6 w-6" />
    },
    {
      title: "Team Management",
      description: "Multi-user team management and templates for consistent branding",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "Export Options",
      description: "Export to popular email clients (Gmail, Outlook, Apple Mail)",
      icon: <Download className="h-6 w-6" />
    },
    {
      title: "Analytics",
      description: "Track signature performance with detailed analytics",
      icon: <BarChart className="h-6 w-6" />
    }
  ];

  return (
    <section className="py-12 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
        <p className="text-muted-foreground mt-4 max-w-[700px] mx-auto">
          Everything you need to create professional email signatures
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border-primary/10 hover:border-primary/30 transition-colors">
            <CardHeader>
              <div className="p-2 w-fit rounded-md bg-primary/10 mb-3">
                {feature.icon}
              </div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}