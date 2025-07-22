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
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6 items-start">
        {/* Left sidebar - 1/4 width */}
        <div className="lg:col-span-1">
          <div className="space-y-4">
            {/* Header aligned with tabs */}
            <div className="px-1">
              <h2 className="text-lg font-semibold">Templates</h2>
              <p className="text-sm text-muted-foreground">Select a template to preview</p>
            </div>

            <Card className="h-fit">
              <CardContent className="p-0">
                <div className="space-y-1">
                  {sidebarItems.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        'p-3 cursor-pointer hover:bg-accent transition-colors',
                        selected === item.id && 'bg-accent'
                      )}
                      onClick={() => setSelected(item.id)}
                    >
                      <div className="font-medium">{item.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main content area - 3/4 width - Sticky */}
        <div className="lg:col-span-3 lg:sticky lg:top-6 lg:self-start lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
          <div className="space-y-4">
            <Tabs defaultValue="preview">
              <TabsList>
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
                      Edit sample data to test how templates look with different information
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 mb-4">
                        <Button
                          size="sm"
                          onClick={() => {
                            // Reset to default data
                            window.location.reload();
                          }}
                        >
                          Reset to Default
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            // Set minimal data
                            console.log('Set minimal data');
                          }}
                        >
                          Minimal Data
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            // Set no logo data
                            console.log('Set no logo data');
                          }}
                        >
                          No Logo
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Full Name *</label>
                            <input
                              type="text"
                              className="w-full mt-1 px-3 py-2 border rounded-md"
                              defaultValue={mockData.name}
                              placeholder="John Doe"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium">Job Title</label>
                            <input
                              type="text"
                              className="w-full mt-1 px-3 py-2 border rounded-md"
                              defaultValue={mockData.title}
                              placeholder="Software Developer"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium">Company</label>
                            <input
                              type="text"
                              className="w-full mt-1 px-3 py-2 border rounded-md"
                              defaultValue={mockData.company}
                              placeholder="Acme Corp"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="text-sm font-medium">Email *</label>
                            <input
                              type="email"
                              className="w-full mt-1 px-3 py-2 border rounded-md"
                              defaultValue={mockData.email}
                              placeholder="john@company.com"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium">Phone</label>
                            <input
                              type="tel"
                              className="w-full mt-1 px-3 py-2 border rounded-md"
                              defaultValue={mockData.phone}
                              placeholder="+27 11 123 4567"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium">Website</label>
                            <input
                              type="url"
                              className="w-full mt-1 px-3 py-2 border rounded-md"
                              defaultValue={mockData.website}
                              placeholder="www.company.com"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium">Primary Color</label>
                            <div className="flex items-center space-x-2 mt-1">
                              <div
                                className="w-8 h-8 rounded border"
                                style={{ backgroundColor: mockData.primaryColor }}
                              />
                              <input
                                type="color"
                                className="w-16 h-8 border rounded"
                                defaultValue={mockData.primaryColor}
                              />
                              <input
                                type="text"
                                className="flex-1 px-3 py-2 border rounded-md"
                                defaultValue={mockData.primaryColor}
                                placeholder="#4285f4"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-sm font-medium">Secondary Color</label>
                            <div className="flex items-center space-x-2 mt-1">
                              <div
                                className="w-8 h-8 rounded border"
                                style={{ backgroundColor: mockData.secondaryColor }}
                              />
                              <input
                                type="color"
                                className="w-16 h-8 border rounded"
                                defaultValue={mockData.secondaryColor}
                              />
                              <input
                                type="text"
                                className="flex-1 px-3 py-2 border rounded-md"
                                defaultValue={mockData.secondaryColor}
                                placeholder="#9aa0a6"
                              />
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium">Logo</label>
                          <div className="mt-1 border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
                            <div className="text-sm text-muted-foreground">
                              Drag and drop your logo here, or click to browse
                            </div>
                            <Button variant="outline" size="sm" className="mt-2">
                              Choose File
                            </Button>
                            <div className="text-xs text-muted-foreground mt-1">
                              PNG, JPG, SVG up to 2MB
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <div className="text-sm text-muted-foreground">
                          <strong>Note:</strong> This is a development environment for testing
                          templates. Changes here don't affect the actual preview data yet - this
                          would be connected to live preview updates in a full implementation.
                        </div>
                      </div>
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
      </div>
    </main>
  );
}
