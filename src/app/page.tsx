import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Container } from "@/components/ui/container";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { PricingSection } from "@/components/pricing-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { FAQSection } from "@/components/faq-section";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col w-full flex-1">
        <Container>
          <HeroSection />
          <FeaturesSection />
          <TestimonialsSection />
        </Container>
        <PricingSection />
        <Container>
          <FAQSection />
          <section className="py-12 md:py-24">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">Ready to get started?</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-[700px] mx-auto">
                Create your professional email signature in minutes
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="#" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-6 py-2 bg-primary text-primary-foreground shadow-xs hover:bg-primary/90">
                  Create Your Signature
                </a>
                <a href="#" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-10 px-6 py-2 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground">
                  View Templates
                </a>
              </div>
            </div>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}