"use client";

import React, { useState, ReactNode, HTMLAttributes } from 'react';
import { Check, Sparkles, Users, Building, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from "next/link";

// Card components
type CardProps = HTMLAttributes<HTMLDivElement> & { className?: string; children: ReactNode };
const Card: React.FC<CardProps> = ({ className = '', children, ...props }) => (
  <div className={`bg-card text-card-foreground rounded-xl shadow-lg border border-border ${className}`} {...props}>
    {children}
  </div>
);
const CardHeader: React.FC<CardProps> = ({ className = '', children, ...props }) => (
  <div className={`p-6 pb-4 ${className}`} {...props}>
    {children}
  </div>
);
const CardContent: React.FC<CardProps> = ({ className = '', children, ...props }) => (
  <div className={`px-6 ${className}`} {...props}>
    {children}
  </div>
);
const CardFooter: React.FC<CardProps> = ({ className = '', children, ...props }) => (
  <div className={`p-6 pt-4 ${className}`} {...props}>
    {children}
  </div>
);
const CardTitle: React.FC<CardProps> = ({ className = '', children, ...props }) => (
  <h3 className={`text-xl font-bold text-foreground ${className}`} {...props}>
    {children}
  </h3>
);
const CardDescription: React.FC<CardProps> = ({ className = '', children, ...props }) => (
  <p className={`text-muted-foreground mt-2 ${className}`} {...props}>
    {children}
  </p>
);

// Plan type
type Plan = {
  name: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
  buttonText: string;
  buttonVariant: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive";
  popular?: boolean;
};

interface PricingCardProps {
  plan: Plan;
  index: number;
}

function PricingCard({ plan, index }: PricingCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getCardIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'free': return <Sparkles className="h-5 w-5 text-primary" />;
      case 'pro': return <Users className="h-5 w-5 text-primary" />;
      case 'team': return <Building className="h-5 w-5 text-primary" />;
      default: return <Crown className="h-5 w-5 text-primary" />;
    }
  };

  const getBg = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'free': return 'bg-primary/10';
      case 'pro': return 'bg-accent/20';
      case 'team': return 'bg-secondary/20';
      default: return 'bg-muted';
    }
  };

  // Determine CTA link based on plan
  let ctaHref = "/register";
  if (plan.name.toLowerCase() === "pro") ctaHref = "/checkout";
  if (plan.name.toLowerCase() === "team") ctaHref = "/contact";

  return (
    <section
      className={`relative transition-all duration-500 transform ${
        isHovered ? 'scale-105 z-10' : 'scale-100'
      } ${plan.popular ? 'md:-translate-y-4' : ''} [animation-delay:${index * 150}ms]`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className={`flex flex-col h-full relative overflow-hidden ${
        plan.popular
          ? 'border-primary shadow-2xl ring-4 ring-primary/20 dark:ring-primary/40'
          : 'hover:border-accent/50 dark:hover:border-accent/70'
      } ${isHovered ? 'shadow-2xl' : 'shadow-lg'}`}>
        {/* Popular badge */}
        {plan.popular && (
          <div className="absolute top-0 left-0 right-0">
            <div className="bg-primary text-primary-foreground text-sm font-bold py-2 text-center relative">
              <Crown className="inline h-4 w-4 mr-1" />
              Most Popular
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
              </div>
            </div>
          </div>
        )}
        {/* Card content */}
        <div className={`${plan.popular ? 'pt-12' : 'pt-6'} flex-1 flex flex-col`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${getBg(plan.name)} text-primary`}>
                  {getCardIcon(plan.name)}
                </div>
                <CardTitle>{plan.name}</CardTitle>
              </div>
              {plan.popular && (
                <div className="animate-pulse">
                  <Sparkles className="h-6 w-6 text-yellow-500" />
                </div>
              )}
            </div>
            <CardDescription>{plan.description}</CardDescription>
            {/* Price section */}
            <div className="mt-6 flex items-baseline">
              <span className="text-4xl font-bold text-foreground">
                {plan.price}
              </span>
              {plan.period && (
                <span className="text-muted-foreground ml-1">
                  {plan.period}
                </span>
              )}
            </div>
            {/* Savings badge for popular plan */}
            {plan.popular && (
              <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Save 20% annually
              </div>
            )}
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-3">
              {plan.features.map((feature: string, i: number) => (
                <li
                  key={i}
                  className={`flex items-start gap-3 group [animation-delay:${(index * 150) + (i * 50)}ms]`}
                >
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-primary flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-200`}>
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="mt-auto">
            <Button
              asChild
              variant={plan.popular ? 'default' : plan.buttonVariant}
              className={`w-full text-center relative overflow-hidden group h-12 transition-colors duration-200 ${
                plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''
              }`}
              aria-label={plan.buttonText}
            >
              <Link href={ctaHref}>
                <span className="relative z-10">{plan.buttonText}</span>
                {plan.popular && (
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                )}
              </Link>
            </Button>
            {/* Additional info */}
            <div className="mt-3 text-center">
              <p className="text-xs text-muted-foreground">
                {plan.name === 'Free' ? 'No credit card required' :
                  plan.name === 'Pro' ? '14-day free trial' :
                    'Custom enterprise solutions'}
              </p>
            </div>
          </CardFooter>
        </div>
      </Card>
    </section>
  );
}

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans: Plan[] = [
    {
      name: "Free",
      description: "Perfect for individuals getting started",
      price: "R0",
      features: [
        "1 professional email signature",
        "5 beautiful templates",
        "Logo upload & customization",
        "Social media links",
        "Export to Gmail & Outlook",
        "Basic analytics"
      ],
      buttonText: "Get Started Free",
      buttonVariant: "outline"
    },
    {
      name: "Pro",
      description: "Ideal for freelancers and professionals",
      price: isAnnual ? "R79" : "R99",
      period: "/month",
      features: [
        "5 email signatures",
        "50+ premium templates",
        "Logo & banner uploads",
        "Advanced social media integration",
        "Real-time analytics dashboard",
        "Export to all email clients",
        "Priority support & tutorials",
        "A/B testing for signatures"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "default",
      popular: true
    },
    {
      name: "Team",
      description: "Built for businesses and growing teams",
      price: isAnnual ? "R239" : "R299",
      period: "/month",
      features: [
        "Unlimited signatures",
        "Advanced team management",
        "Custom branding & templates",
        "White-label solutions",
        "Advanced analytics & reporting",
        "API access & integrations",
        "Dedicated account manager",
        "SSO & enterprise security"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline"
    }
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple, Transparent
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Pricing</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                isAnnual ? 'bg-primary' : 'bg-muted'
              }`}
              aria-label="Toggle annual billing"
              title="Toggle annual billing"
              type="button"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>Annual</span>
            {isAnnual && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Save 20%
              </span>
            )}
          </div>
        </div>
        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
          {plans.map((plan: Plan, index: number) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Need something custom? We&apos;re here to help.
          </p>
          <Button variant="outline" className="mr-4 h-12 transition-colors duration-200">
            Schedule a Demo
          </Button>
          <Button variant="default" className="h-12 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}