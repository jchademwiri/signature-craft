"use client";

import React, { useState } from 'react';
import { Check, Sparkles, Users, Building, Crown } from 'lucide-react';

const Button = ({ variant = 'default', className = '', children, ...props }) => {
  const baseStyles = 'px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    default: 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl',
    outline: 'border-2 border-gray-300 text-gray-700 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50',
    premium: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-lg hover:shadow-xl'
  };
  
  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card = ({ className = '', children, ...props }) => (
  <div className={`bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ className = '', children, ...props }) => (
  <div className={`p-6 pb-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardContent = ({ className = '', children, ...props }) => (
  <div className={`px-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ className = '', children, ...props }) => (
  <div className={`p-6 pt-4 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className = '', children, ...props }) => (
  <h3 className={`text-xl font-bold text-gray-900 dark:text-white ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ className = '', children, ...props }) => (
  <p className={`text-gray-600 dark:text-gray-400 mt-2 ${className}`} {...props}>
    {children}
  </p>
);

function PricingCard({ plan, index }) {
  const [isHovered, setIsHovered] = useState(false);
  
  const getCardIcon = (planName) => {
    switch(planName.toLowerCase()) {
      case 'free': return <Sparkles className="h-5 w-5" />;
      case 'pro': return <Users className="h-5 w-5" />;
      case 'team': return <Building className="h-5 w-5" />;
      default: return <Crown className="h-5 w-5" />;
    }
  };

  const getGradientBg = (planName) => {
    switch(planName.toLowerCase()) {
      case 'free': return 'from-blue-500 to-cyan-500';
      case 'pro': return 'from-purple-500 to-pink-500';
      case 'team': return 'from-amber-500 to-orange-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div 
      className={`relative transition-all duration-500 transform ${
        isHovered ? 'scale-105 z-10' : 'scale-100'
      } ${plan.popular ? 'md:-translate-y-4' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <Card className={`flex flex-col h-full relative overflow-hidden ${
        plan.popular 
          ? 'border-2 border-purple-500 shadow-2xl ring-4 ring-purple-100 dark:ring-purple-900' 
          : 'hover:border-gray-300 dark:hover:border-gray-600'
      } ${isHovered ? 'shadow-2xl' : 'shadow-lg'}`}>
        
        {/* Popular badge */}
        {plan.popular && (
          <div className="absolute top-0 left-0 right-0">
            <div className={`bg-gradient-to-r ${getGradientBg(plan.name)} text-white text-sm font-bold py-2 text-center relative`}>
              <Crown className="inline h-4 w-4 mr-1" />
              Most Popular
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-purple-500"></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Card content */}
        <div className={`${plan.popular ? 'pt-12' : 'pt-6'} flex-1 flex flex-col`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${getGradientBg(plan.name)} text-white`}>
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
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                {plan.price}
              </span>
              {plan.period && (
                <span className="text-gray-600 dark:text-gray-400 ml-1">
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
              {plan.features.map((feature, i) => (
                <li 
                  key={i} 
                  className="flex items-start gap-3 group"
                  style={{ animationDelay: `${(index * 150) + (i * 50)}ms` }}
                >
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${getGradientBg(plan.name)} flex items-center justify-center mt-0.5 group-hover:scale-110 transition-transform duration-200`}>
                    <Check className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-200">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
          
          <CardFooter className="mt-auto">
            <Button 
              variant={plan.popular ? 'premium' : plan.buttonVariant} 
              className="w-full text-center relative overflow-hidden group"
            >
              <span className="relative z-10">{plan.buttonText}</span>
              {plan.popular && (
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              )}
            </Button>
            
            {/* Additional info */}
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {plan.name === 'Free' ? 'No credit card required' : 
                 plan.name === 'Pro' ? '14-day free trial' : 
                 'Custom enterprise solutions'}
              </p>
            </div>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);
  
  const plans = [
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
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Pricing</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
          
          {/* Billing toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                isAnnual ? 'bg-purple-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
              Annual
            </span>
            {isAnnual && (
              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                Save 20%
              </span>
            )}
          </div>
        </div>
        
        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} index={index} />
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Need something custom? We're here to help.
          </p>
          <Button variant="outline" className="mr-4">
            Schedule a Demo
          </Button>
          <Button variant="default">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}