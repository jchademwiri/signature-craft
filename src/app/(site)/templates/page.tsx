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
      <Container className="flex flex-col items-center py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Professional Email Signature Templates</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
            Choose from our collection of professionally designed email signature templates. Each
            template is optimized for all major email clients and fully customizable.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <Badge variant="secondary">{templateArray.length} Templates Available</Badge>
            <Badge variant="secondary">Email Client Compatible</Badge>
            <Badge variant="secondary">Fully Customizable</Badge>
          </div>
          <Link href="/register">
            <Button size="lg" className="mb-8">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full max-w-4xl">
          {features.map((feature, index) => (
            <Card key={index} className="text-center">
              <CardHeader className="pb-4">
                <feature.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="mb-16" />

        {/* Templates Gallery */}
        <div className="w-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Template Gallery</h2>
            <p className="text-muted-foreground">
              Preview all available templates with sample data
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {templateArray.map((Template: TemplateComponent) => (
              <Card key={Template.metadata.id} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-xl">{Template.metadata.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {Template.metadata.description}
                      </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {Template.metadata.tags?.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/30 p-6 rounded-lg border-2 border-dashed border-muted-foreground/20">
                    <div className="flex justify-center">
                      <div className="w-full max-w-lg">
                        <Template {...mockData} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Category: {Template.metadata.category || 'Professional'}
                    </div>
                    <Link href="/builder">
                      <Button variant="outline" size="sm">
                        Use This Template
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="p-8 bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-2xl">Ready to Create Your Signature?</CardTitle>
              <CardDescription className="text-lg">
                Choose your favorite template and customize it in minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg">
                    Create Free Account
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/builder">
                  <Button variant="outline" size="lg">
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
