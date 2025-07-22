'use client';

import { useSession } from '@/lib/auth-client';
import { useState } from 'react';
import { TEMPLATES } from '@/templates';
import { TemplateComponent, TemplateProps } from '@/templates/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Monitor, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

const isDev = process.env.NODE_ENV === 'development';

const sidebarItems = [
  { label: 'Classic', id: 'classic' },
  { label: 'Modern', id: 'modern' },
  { label: 'Minimal', id: 'minimal' },
  { label: 'Corporate', id: 'corporate' },
];

const mockData: TemplateProps = {
  name: 'Sarah Johnson',
  title: 'Senior Product Manager',
  company: 'TechCorp Solutions',
  email: 'sarah.johnson@techcorp.com',
  phone: '+27 11 123 4567',
  website: 'www.techcorp.co.za',
  logoData: '/logo.svg',
  primaryColor: '#4285f4',
  secondaryColor: '#9aa0a6',
};

export default function Preview() {
  const { data: session, isPending } = useSession();
  const [selected, setSelected] = useState<string>(sidebarItems[0].id);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  if (!isDev && !isPending && !session) {
    return (
      <main className="flex items-center justify-center min-h-[60vh]">
        <Card>
          <CardHeader>
            <CardTitle>Access Restricted</CardTitle>
            <CardDescription>
              You must be signed in to access the preview environment.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    );
  }

  const Template: TemplateComponent = TEMPLATES[selected];

  return (
    <main className="min-h-screen bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
        {/* Left sidebar - 1/4 width */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Templates</CardTitle>
              <CardDescription>Select a template to preview</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {sidebarItems.map((item) => {
                  const TemplatePreview = TEMPLATES[item.id];
                  return (
                    <div
                      key={item.id}
                      className={cn(
                        'p-3 cursor-pointer hover:bg-accent transition-colors',
                        selected === item.id && 'bg-accent'
                      )}
                      onClick={() => setSelected(item.id)}
                    >
                      <div className="font-medium">{item.label}</div>
                      <div className="text-xs text-muted-foreground mb-2">
                        {TemplatePreview.metadata.description}
                      </div>
                      <div className="border rounded p-2 bg-card text-xs">
                        <TemplatePreview
                          name="John Doe"
                          title="Manager"
                          company="Company"
                          email="john@company.com"
                          phone="+27 11 123 4567"
                          website="www.company.com"
                          primaryColor="#4285f4"
                          secondaryColor="#9aa0a6"
                          showMobile={false}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content area - 3/4 width - Sticky */}
        <div className="lg:col-span-3 lg:sticky lg:top-6 lg:self-start lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
          <Tabs defaultValue="preview">
            <TabsList className="mb-4">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="data">Test Data</TabsTrigger>
              <TabsTrigger value="export">Export Test</TabsTrigger>
            </TabsList>

            <TabsContent value="preview">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>{Template.metadata.name}</CardTitle>
                    <CardDescription>{Template.metadata.description}</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      type="button"
                      variant={viewMode === 'desktop' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('desktop')}
                    >
                      <Monitor className="h-4 w-4 mr-1" />
                      Desktop
                    </Button>
                    <Button
                      type="button"
                      variant={viewMode === 'mobile' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('mobile')}
                    >
                      <Smartphone className="h-4 w-4 mr-1" />
                      Mobile
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div
                    className={cn(
                      'border rounded-lg p-8 bg-white shadow-sm',
                      viewMode === 'mobile' && 'max-w-[375px] mx-auto p-4'
                    )}
                  >
                    <Template {...mockData} showMobile={viewMode === 'mobile'} />
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-sm text-muted-foreground">
                      Live preview of the <strong>{Template.metadata.name}</strong> template
                    </span>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="data">
              <Card>
                <CardHeader>
                  <CardTitle>Test Data</CardTitle>
                  <CardDescription>
                    This tab would contain a form to edit sample data for template preview
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground">
                    Sample data form component would be implemented here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="export">
              <Card>
                <CardHeader>
                  <CardTitle>Export Test</CardTitle>
                  <CardDescription>
                    Test signature export for different email clients
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground">
                    Export test panel would be implemented here
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
