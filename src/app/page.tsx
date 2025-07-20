import Link from "next/link";
import Image from "next/image";
import trustedGoogle from "@/../public/trusted-google.svg";
import trustedMicrosoft from "@/../public/trusted-microsoft.svg";
import trustedAws from "@/../public/trusted-aws.svg";
import trustedMeta from "@/../public/trusted-meta.svg";
import trustedShopify from "@/../public/trusted-shopify.svg";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { PricingSection } from "@/components/pricing-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FAQSection } from "@/components/faq-section";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col w-full flex-1 pt-16 bg-background">
        {/* Hero Section */}
        <Container>
          <section id="hero">
            <HeroSection />
          </section>
        </Container>
        {/* Features Section */}
        <section className="bg-muted/40 border-t border-b border-border">
          <Container>
            <FeaturesSection />
          </Container>
        </section>
        {/* Testimonials Section */}
        <Container>
          <section id="testimonials">
            <TestimonialsSection />
          </section>
        </Container>
        {/* Pricing Section */}
        <section id="pricing" className="bg-muted/30 border-t border-border">
          <Container>
            <PricingSection />
          </Container>
        </section>
        {/* FAQ Section */}
        <Container>
          <section id="faq">
            <FAQSection />
          </section>
        </Container>
        {/* Final CTA Section */}
        <section className="py-16 bg-primary/10 border-t border-primary/20">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-4xl font-bold tracking-tight mb-6 text-primary">Ready to get started?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Create your professional email signature in under 5 minutes
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4">
                <Button size="lg" asChild className="text-white">
                  <Link href="/register">Create Your Signature</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Already have an account? <Link href="/login" className="text-primary hover:underline">Sign in here</Link>
              </p>
              <div className="mt-8">
                <Button variant="ghost" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}