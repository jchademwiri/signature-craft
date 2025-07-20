"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { HelpCircle } from "lucide-react";

export function FAQSection() {
  const faqs = [
    {
      question: "How do I create an email signature?",
      answer: "Simply sign up for a free account, choose a template, customize it with your information and branding, and export it to your email client. Our step-by-step wizard makes the process quick and easy."
    },
    {
      question: "Which email clients are supported?",
      answer: "SignatureCraft supports all major email clients including Gmail, Outlook, Apple Mail, Yahoo Mail, and more. We provide specific instructions for each client to ensure your signature displays correctly."
    },
    {
      question: "Can I add my company logo and social media links?",
      answer: "Yes! All plans allow you to upload your logo and add social media links. Premium plans offer additional options like banners and custom branding elements."
    },
    {
      question: "How do I manage signatures for my team?",
      answer: "Our Team plan allows you to create and manage signatures for your entire team from a central dashboard. You can ensure consistent branding while allowing individual customization where needed."
    },
    {
      question: "Is there a free plan available?",
      answer: "Yes, we offer a free plan that includes basic features for individuals. You can create one signature with our basic templates, add your logo and social links, and export to Gmail and Outlook."
    },
    {
      question: "How do I get help if I'm stuck?",
      answer: "We offer comprehensive documentation, video tutorials, and email support for all users. Premium plans include priority support with faster response times."
    }
  ];

  return (
    <section className="py-12 md:py-24" aria-labelledby="faq-heading">
      <div className="text-center mb-12">
        <h2 id="faq-heading" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Frequently Asked Questions</h2>
        <p className="text-muted-foreground mt-4 max-w-[700px] mx-auto">
          Everything you need to know about SignatureCraft
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="text-center mt-8">
          <Button asChild variant="outline">
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}