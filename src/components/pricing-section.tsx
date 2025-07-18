"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

function PricingCard({ plan }: { plan: typeof plans[number] }) {
  return (
    <Card className={`flex flex-col h-full ${plan.popular ? 'border-primary shadow-lg' : ''}`}>
      {plan.popular && (
        <div className="bg-primary text-primary-foreground text-sm font-medium py-1 text-center rounded-t-xl">
          Most Popular
        </div>
      )}
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className="mt-4">
          <span className="text-4xl font-bold">{plan.price}</span>
          {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {plan.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="mt-auto">
        <Button variant={plan.buttonVariant} className="w-full">
          {plan.buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}

export function PricingSection() {
  const plans = [
    {
      name: "Free",
      description: "For individuals getting started",
      price: "R0",
      features: [
        "1 email signature",
        "Basic templates",
        "Logo upload",
        "Social media links",
        "Export to Gmail & Outlook"
      ],
      buttonText: "Get Started",
      buttonVariant: "outline" as const
    },
    {
      name: "Pro",
      description: "For freelancers and professionals",
      price: "R99",
      period: "/month",
      features: [
        "5 email signatures",
        "Premium templates",
        "Logo & banner uploads",
        "Social media integration",
        "Analytics dashboard",
        "Export to all email clients",
        "Priority support"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "default" as const,
      popular: true
    },
    {
      name: "Team",
      description: "For businesses and teams",
      price: "R299",
      period: "/month",
      features: [
        "Unlimited signatures",
        "Team management",
        "Custom branding",
        "White-label options",
        "Advanced analytics",
        "API access",
        "Dedicated support"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const
    }
  ];

  return (
    <section className="py-12 md:py-24 bg-muted/50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2>
        <p className="text-muted-foreground mt-4 max-w-[700px] mx-auto">
          Choose the plan that's right for you or your team
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, index) => (
          <PricingCard key={index} plan={plan} />
        ))}
      </div>
    </section>
  );
}