import { TEMPLATES } from '@/templates';
import { TemplateProps, TemplateComponent } from '@/templates/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/ui/container';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { ArrowRight, Palette, Users, Zap } from 'lucide-react';

const mockData: TemplateProps = {
  name: 'Sarah Johnson',
  title: 'Senior Product Manager',
  company: 'TechCorp Solutions',
  email: 'sarah.johnson@techcorp.com',
  phone: '+27 11 123 4567',
  website: 'www.techcorp.co.za',
  address: 'Cape Town, South Africa',
  logoData: '/logo.svg', // Using the actual logo
  primaryColor: '#2563eb',
  secondaryColor: '#64748b',
  socialLinks: {
    linkedin: 'linkedin.com/in/sarahjohnson',
    twitter: 'twitter.com/sarahj',
  },
};

const features = [
  {
    icon: Palette,
    title: 'Customizable Colors',
    description: 'Match your brand with custom primary and secondary colors',
  },
  {
    icon: Users,
    title: 'Professional Design',
    description: 'Templates designed by professionals for business use',
  },
  {
    icon: Zap,
    title: 'Email Compatible',
    description: 'Works perfectly in Gmail, Outlook, and Apple Mail',
  },
];

export default function TemplatesGalleryPage() {
  const templateArray = Object.values(TEMPLATES);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-background py-15 border-b">
        <Container className="flex flex-col items-center pt-24 pb-20">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold mb-6 tracking-tight">
              Professional Email Signature Templates
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto px-4">
              Choose from our collection of professionally designed email signature templates. Each
              template is optimized for all major email clients and fully customizable.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium">
                {templateArray.length} Templates Available
              </Badge>
              <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium">
                Email Client Compatible
              </Badge>
              <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium">
                Fully Customizable
              </Badge>
            </div>
            <Link href="/register">
              <Button size="lg" className="h-12 px-8 text-base">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </Container>
      </div>

      <Container className="flex flex-col items-center py-16">
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 w-full max-w-5xl">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-center border-2 shadow-sm hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-4 pt-6">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="mb-20 max-w-4xl w-full opacity-50" />

        {/* Templates Gallery */}
        <div className="w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-5">Template Gallery</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Preview all available templates with sample data
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
            {templateArray.map((Template: TemplateComponent) => (
              <Card
                key={Template.metadata.id}
                className="overflow-hidden border-2 shadow-sm hover:shadow-md transition-all"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{Template.metadata.name}</CardTitle>
                      <CardDescription className="mt-1 text-sm">
                        {Template.metadata.description}
                      </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {Template.metadata.tags?.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs px-2.5 py-0.5">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/20 p-6 rounded-lg border-2 border-dashed border-muted-foreground/20 hover:bg-muted/30 transition-colors">
                    <div className="flex justify-center">
                      <div className="w-full max-w-lg bg-white p-3 rounded-md shadow-sm">
                        <Template {...mockData} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Category:{' '}
                      <span className="font-medium">
                        {Template.metadata.category || 'Professional'}
                      </span>
                    </div>
                    <Link href="/builder">
                      <Button variant="outline" size="sm" className="h-9 px-4">
                        Use This Template
                        <ArrowRight className="ml-2 h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-24 w-full max-w-4xl">
          <Card className="p-10 bg-primary/5 border-primary/20 shadow-sm">
            <CardHeader className="pb-6">
              <CardTitle className="text-3xl">Ready to Create Your Signature?</CardTitle>
              <CardDescription className="text-lg mt-2">
                Choose your favorite template and customize it in minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link href="/register">
                  <Button size="lg" className="h-12 px-8 text-base">
                    Create Free Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/builder">
                  <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                    Try Builder Demo
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </main>
  );
}
