"use client";


import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "SignatureCraft transformed our team's email presence. The templates are professional and the platform is incredibly easy to use.",
      author: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechSolutions Inc."
    },
    {
      quote: "As a freelancer, my email signature is an important part of my brand. SignatureCraft helped me create a signature that stands out and looks professional.",
      author: "Michael Chen",
      role: "Independent Designer",
      company: "Studio Chen"
    },
    {
      quote: "The team management features saved us hours of work. Now all our employees have consistent, professional signatures that reflect our brand.",
      author: "Thabo Nkosi",
      role: "Operations Manager",
      company: "Innovate SA"
    }
  ];

  return (
    <section className="py-12 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Customers Say</h2>
        <p className="text-muted-foreground mt-4 max-w-[700px] mx-auto">
          Join thousands of professionals who trust SignatureCraft
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary opacity-50"
                  >
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                  </svg>
                </div>
                <p className="text-lg mb-6 flex-grow">{testimonial.quote}</p>
                <Separator className="mb-4" />
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}