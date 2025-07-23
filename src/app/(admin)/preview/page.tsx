'use client';

import { useSession } from '@/lib/auth-client';
import { useState, useEffect } from 'react';
import { TEMPLATES } from '@/templates';
import { TemplateComponent, TemplateProps } from '@/templates/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Monitor,
  Smartphone,
  Save,
  Plus,
  Trash2,
  Upload,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  MessageSquare,
} from 'lucide-react';
import { FeedbackModal } from '@/components/feedback-modal';
import { cn } from '@/lib/utils';

interface TestDataConfig {
  id: string;
  name: string;
  description?: string;
  testName: string;
  testTitle?: string;
  testCompany?: string;
  testEmail: string;
  testPhone?: string;
  testWebsite?: string;
  testAddress?: string;
  testLogoData?: string;
  testPrimaryColor: string;
  testSecondaryColor: string;
  isDefault: boolean;
}

const isDev = process.env.NODE_ENV === 'development';

const sidebarItems = [
  { label: 'Classic', id: 'classic' },
  { label: 'Modern', id: 'modern' },
  { label: 'Minimal', id: 'minimal' },
  { label: 'Corporate', id: 'corporate' },
];

const defaultMockData: TemplateProps = {
  name: 'Sarah Johnson',
  title: 'Senior Product Manager',
  company: 'TechCorp Solutions',
  email: 'sarah.johnson@techcorp.com',
  phone: '+27 11 123 4567',
  website: 'www.techcorp.co.za',
  address: '123 Main Street, Sandton, Johannesburg',
  logoData: '/logo.svg',
  primaryColor: '#4285f4',
  secondaryColor: '#9aa0a6',
};

export default function Preview() {
  const { data: session, isPending } = useSession();
  const [selected, setSelected] = useState<string>(sidebarItems[0].id);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  // Test data state
  const [testConfigs, setTestConfigs] = useState<TestDataConfig[]>([]);
  const [currentConfig, setCurrentConfig] = useState<string>('');
  const [testData, setTestData] = useState<TemplateProps>(defaultMockData);
  const [configName, setConfigName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  // Feedback modal state
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | 'info'>('success');
  const [feedbackTitle, setFeedbackTitle] = useState('');
  const [feedbackDescription, setFeedbackDescription] = useState('');

  // Load test configurations on mount
  useEffect(() => {
    if (session) {
      loadTestConfigs();
    }
  }, [session]);

  // Show feedback modal
  const showFeedback = (type: 'success' | 'error' | 'info', title: string, description: string) => {
    setFeedbackType(type);
    setFeedbackTitle(title);
    setFeedbackDescription(description);
    setFeedbackModalOpen(true);

    // Reset confirmation state when showing non-confirmation feedback
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(false);
      setConfigToDelete(null);
    }
  };

  // Handle feedback submission
  const handleFeedbackSubmit = async (email: string, message: string) => {
    console.log('Feedback submitted:', { email, message });
    // In a real app, you would send this to your backend
    // For now, we'll just log it and show a success message
    showFeedback(
      'success',
      'Thank you for your feedback!',
      'We appreciate your input and will review it shortly.'
    );
  };

  const loadTestConfigs = async () => {
    try {
      setIsLoading(true);
      console.log('Loading test configs...');

      const response = await fetch('/api/admin/test-data');
      console.log('Load response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Loaded configs:', data.configs);
        setTestConfigs(data.configs || []);

        // Load default config if exists
        const defaultConfig = data.configs?.find((config: TestDataConfig) => config.isDefault);
        if (defaultConfig) {
          loadTestConfig(defaultConfig);
          setCurrentConfig(defaultConfig.id);
        }
      } else {
        const errorData = await response.json();
        console.error('Failed to load configs:', errorData);
        showFeedback('error', 'Loading Failed', 'Could not load your saved configurations.');
      }
    } catch (error) {
      console.error('Error loading test configs:', error);
      showFeedback(
        'error',
        'Loading Error',
        'An unexpected error occurred while loading configurations.'
      );
    } finally {
      setIsLoading(false);
    }
  };
  const loadTestConfig = (config: TestDataConfig) => {
    setTestData({
      name: config.testName,
      title: config.testTitle || '',
      company: config.testCompany || '',
      email: config.testEmail,
      phone: config.testPhone || '',
      website: config.testWebsite || '',
      address: config.testAddress || '',
      logoData: config.testLogoData || '',
      primaryColor: config.testPrimaryColor,
      secondaryColor: config.testSecondaryColor,
    });
  };

  const saveTestConfig = async () => {
    if (!configName.trim()) {
      showFeedback('error', 'Missing Information', 'Please enter a configuration name');
      return;
    }

    if (!testData.name || !testData.email) {
      showFeedback(
        'error',
        'Missing Information',
        'Please fill in required fields: Name and Email'
      );
      return;
    }

    try {
      setIsSaving(true);
      console.log('Saving test config:', {
        id: currentConfig || undefined,
        name: configName,
        testData,
      });

      const response = await fetch('/api/admin/test-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: currentConfig || undefined,
          name: configName,
          description: `Test data configuration: ${configName}`,
          testName: testData.name,
          testTitle: testData.title,
          testCompany: testData.company,
          testEmail: testData.email,
          testPhone: testData.phone,
          testWebsite: testData.website,
          testAddress: testData.address,
          testLogoData: testData.logoData,
          testPrimaryColor: testData.primaryColor,
          testSecondaryColor: testData.secondaryColor,
          isDefault: false,
        }),
      });

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (response.ok) {
        await loadTestConfigs();
        setCurrentConfig(responseData.config.id);
        showFeedback('success', 'Saved Successfully', 'Your test configuration has been saved.');
      } else {
        console.error('Save failed:', responseData);
        showFeedback(
          'error',
          'Save Failed',
          responseData.error || 'Unknown error occurred while saving.'
        );
      }
    } catch (error) {
      console.error('Error saving test config:', error);
      showFeedback(
        'error',
        'Save Error',
        `Failed to save test configuration: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    } finally {
      setIsSaving(false);
    }
  };

  // State for confirmation dialog
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [configToDelete, setConfigToDelete] = useState<string | null>(null);

  const confirmDeleteConfig = (configId: string) => {
    setConfigToDelete(configId);
    showFeedback(
      'error',
      'Confirm Deletion',
      'Are you sure you want to delete this configuration?'
    );
    setShowDeleteConfirm(true);
  };

  const deleteTestConfig = async (configId: string) => {
    try {
      const response = await fetch(`/api/admin/test-data/${configId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadTestConfigs();
        if (currentConfig === configId) {
          setCurrentConfig('');
          setTestData(defaultMockData);
        }
        showFeedback('success', 'Deleted Successfully', 'The configuration has been deleted.');
      } else {
        showFeedback('error', 'Delete Failed', 'Could not delete the configuration.');
      }
    } catch (error) {
      console.error('Error deleting test config:', error);
      showFeedback('error', 'Delete Error', 'An error occurred while deleting the configuration.');
    } finally {
      setConfigToDelete(null);
      setShowDeleteConfirm(false);
    }
  };

  const handleTestDataChange = (field: keyof TemplateProps, value: string) => {
    setTestData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const loadPresetData = (preset: 'default' | 'minimal' | 'noLogo') => {
    switch (preset) {
      case 'default':
        setTestData(defaultMockData);
        break;
      case 'minimal':
        setTestData({
          name: 'John Doe',
          title: '',
          company: '',
          email: 'john@example.com',
          phone: '',
          website: '',
          address: '',
          logoData: '',
          primaryColor: '#000000',
          secondaryColor: '#666666',
        });
        break;
      case 'noLogo':
        setTestData({
          ...defaultMockData,
          logoData: '',
        });
        break;
    }
  };

  // Logo upload functions
  const handleLogoUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      showFeedback('error', 'Invalid File Type', 'Please upload a PNG, JPG, or SVG file');
      return;
    }

    // Validate file size (2MB max)
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      showFeedback('error', 'File Too Large', 'File size must be less than 2MB');
      return;
    }
    try {
      setIsUploadingLogo(true);

      // Convert to base64
      const base64 = await fileToBase64(file);

      // If it's not SVG, resize the image
      if (file.type !== 'image/svg+xml') {
        const resizedBase64 = await resizeImage(base64, 150, 150);
        handleTestDataChange('logoData', resizedBase64);
      } else {
        handleTestDataChange('logoData', base64);
      }

      console.log('Logo uploaded successfully');
      showFeedback(
        'success',
        'Logo Uploaded',
        'Your logo has been uploaded and added to the signature.'
      );
    } catch (error) {
      console.error('Error uploading logo:', error);
      showFeedback('error', 'Upload Failed', 'Failed to upload logo. Please try again.');
    } finally {
      setIsUploadingLogo(false);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const resizeImage = (base64: string, maxWidth: number, maxHeight: number): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;

        // Calculate new dimensions
        let { width, height } = img;
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }
        canvas.width = width;
        canvas.height = height;

        // Draw and resize
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/png', 0.9));
      };
      img.src = base64;
    });
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleLogoUpload(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleLogoUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const removeLogo = () => {
    handleTestDataChange('logoData', '');
  };

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
                      <Template {...testData} showMobile={viewMode === 'mobile'} />
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
                      Edit and save test data configurations for template testing
                    </CardDescription>
                    {session && (
                      <div className="text-xs text-green-600">
                        ✓ Logged in as: {session.user.email}
                      </div>
                    )}
                    {!session && !isPending && (
                      <div className="text-xs text-red-600">✗ Not logged in</div>
                    )}
                    {isPending && (
                      <div className="text-xs text-yellow-600">⏳ Checking session...</div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Configuration Management */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Select
                            value={currentConfig}
                            onValueChange={(value) => {
                              setCurrentConfig(value);
                              const config = testConfigs.find((c) => c.id === value);
                              if (config) {
                                loadTestConfig(config);
                                setConfigName(config.name);
                              }
                            }}
                          >
                            <SelectTrigger className="w-48">
                              <SelectValue placeholder="Select configuration" />
                            </SelectTrigger>
                            <SelectContent>
                              {testConfigs.map((config) => (
                                <SelectItem key={config.id} value={config.id}>
                                  {config.name} {config.isDefault && '(Default)'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {currentConfig && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => confirmDeleteConfig(currentConfig)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <Input
                            placeholder="Configuration name"
                            value={configName}
                            onChange={(e) => setConfigName(e.target.value)}
                            className="w-48"
                          />
                          <Button
                            size="sm"
                            onClick={saveTestConfig}
                            disabled={isSaving || !configName.trim()}
                          >
                            {isSaving ? (
                              <>Saving...</>
                            ) : (
                              <>
                                <Save className="h-4 w-4 mr-1" />
                                Save Config
                              </>
                            )}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              console.log('Current test data:', testData);
                              console.log('Config name:', configName);
                              console.log('Current config:', currentConfig);

                              // Show debug info in feedback modal
                              const debugInfo = `
Config Name: ${configName || 'Not set'}
Current Config ID: ${currentConfig || 'Not set'}
Test Data:
- Name: ${testData.name}
- Title: ${testData.title || 'Not set'}
- Company: ${testData.company || 'Not set'}
- Email: ${testData.email}
- Phone: ${testData.phone || 'Not set'}
- Website: ${testData.website || 'Not set'}
- Address: ${testData.address || 'Not set'}
- Logo: ${testData.logoData ? 'Present' : 'Not set'}
- Primary Color: ${testData.primaryColor}
- Secondary Color: ${testData.secondaryColor}
                              `;

                              showFeedback('info', 'Debug Information', debugInfo);
                            }}
                          >
                            Debug Data
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={async () => {
                              try {
                                const response = await fetch('/api/admin/test-simple', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({
                                    testData,
                                    configName,
                                    timestamp: new Date().toISOString(),
                                  }),
                                });
                                const data = await response.json();
                                console.log('Simple test result:', data);
                                showFeedback(
                                  'success',
                                  'API Test Result',
                                  `Simple test: ${data.status}`
                                );
                              } catch (error) {
                                console.error('Simple test failed:', error);
                                showFeedback(
                                  'error',
                                  'API Test Failed',
                                  `Simple test failed: ${error}`
                                );
                              }
                            }}
                          >
                            Test API
                          </Button>
                        </div>
                      </div>
                      {/* Quick Presets */}
                      <div className="flex items-center space-x-2 pb-4 border-b">
                        <Button size="sm" onClick={() => loadPresetData('default')}>
                          Default Data
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => loadPresetData('minimal')}
                        >
                          Minimal Data
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => loadPresetData('noLogo')}
                        >
                          No Logo
                        </Button>
                      </div>

                      {/* Form Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="testName">Full Name *</Label>
                            <Input
                              id="testName"
                              value={testData.name}
                              onChange={(e) => handleTestDataChange('name', e.target.value)}
                              placeholder="John Doe"
                            />
                          </div>

                          <div>
                            <Label htmlFor="testTitle">Job Title</Label>
                            <Input
                              id="testTitle"
                              value={testData.title || ''}
                              onChange={(e) => handleTestDataChange('title', e.target.value)}
                              placeholder="Software Developer"
                            />
                          </div>

                          <div>
                            <Label htmlFor="testCompany">Company</Label>
                            <Input
                              id="testCompany"
                              value={testData.company || ''}
                              onChange={(e) => handleTestDataChange('company', e.target.value)}
                              placeholder="Acme Corp"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="testEmail">Email *</Label>
                            <Input
                              id="testEmail"
                              type="email"
                              value={testData.email}
                              onChange={(e) => handleTestDataChange('email', e.target.value)}
                              placeholder="john@company.com"
                            />
                          </div>

                          <div>
                            <Label htmlFor="testPhone">Phone</Label>
                            <Input
                              id="testPhone"
                              type="tel"
                              value={testData.phone || ''}
                              onChange={(e) => handleTestDataChange('phone', e.target.value)}
                              placeholder="+27 11 123 4567"
                            />
                          </div>

                          <div>
                            <Label htmlFor="testWebsite">Website</Label>
                            <Input
                              id="testWebsite"
                              type="url"
                              value={testData.website || ''}
                              onChange={(e) => handleTestDataChange('website', e.target.value)}
                              placeholder="www.company.com"
                            />
                          </div>

                          <div>
                            <Label htmlFor="testAddress">Address</Label>
                            <Input
                              id="testAddress"
                              value={testData.address || ''}
                              onChange={(e) => handleTestDataChange('address', e.target.value)}
                              placeholder="123 Main St, City, Country"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Colors */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="primaryColor">Primary Color</Label>
                          <div className="flex items-center space-x-2 mt-1">
                            <div
                              className="w-8 h-8 rounded border"
                              style={{ backgroundColor: testData.primaryColor }}
                            />
                            <Input
                              id="primaryColor"
                              type="color"
                              value={testData.primaryColor}
                              onChange={(e) => handleTestDataChange('primaryColor', e.target.value)}
                              className="w-16 h-8"
                            />
                            <Input
                              value={testData.primaryColor}
                              onChange={(e) => handleTestDataChange('primaryColor', e.target.value)}
                              placeholder="#4285f4"
                              className="flex-1"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="secondaryColor">Secondary Color</Label>
                          <div className="flex items-center space-x-2 mt-1">
                            <div
                              className="w-8 h-8 rounded border"
                              style={{ backgroundColor: testData.secondaryColor }}
                            />
                            <Input
                              id="secondaryColor"
                              type="color"
                              value={testData.secondaryColor}
                              onChange={(e) =>
                                handleTestDataChange('secondaryColor', e.target.value)
                              }
                              className="w-16 h-8"
                            />
                            <Input
                              value={testData.secondaryColor}
                              onChange={(e) =>
                                handleTestDataChange('secondaryColor', e.target.value)
                              }
                              placeholder="#9aa0a6"
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Logo Upload */}
                      <div>
                        <Label>Logo</Label>
                        {testData.logoData ? (
                          <div className="mt-1 border rounded-md p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center overflow-hidden">
                                  <img
                                    src={testData.logoData}
                                    alt="Logo preview"
                                    className="max-w-full max-h-full object-contain"
                                  />
                                </div>
                                <div className="text-sm">Logo uploaded</div>
                              </div>
                              <Button size="sm" variant="outline" onClick={removeLogo}>
                                <X className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div
                            className="mt-1 border-2 border-dashed border-gray-300 rounded-md p-4 text-center"
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                          >
                            <input
                              type="file"
                              id="logo-upload"
                              className="hidden"
                              accept="image/png,image/jpeg,image/jpg,image/svg+xml"
                              onChange={handleFileInputChange}
                            />
                            <div className="text-sm text-muted-foreground">
                              {isUploadingLogo
                                ? 'Processing logo...'
                                : 'Drag and drop your logo here, or click to browse'}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => document.getElementById('logo-upload')?.click()}
                              disabled={isUploadingLogo}
                            >
                              <Upload className="h-4 w-4 mr-1" />
                              Choose File
                            </Button>
                            <div className="text-xs text-muted-foreground mt-1">
                              PNG, JPG, SVG up to 2MB
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Status */}
                      <div className="pt-4 border-t">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            <strong>Status:</strong> Changes are applied to preview in real-time.
                            Save configurations to persist your test data across sessions.
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={async () => {
                                try {
                                  const response = await fetch('/api/admin/test-connection');
                                  const data = await response.json();
                                  console.log('Connection test:', data);
                                  showFeedback(
                                    'info',
                                    'Connection Test Result',
                                    `Status: ${data.status}\nAuth: ${data.auth}\nDatabase: ${data.database}\nUser ID: ${data.userId}`
                                  );
                                } catch (error) {
                                  console.error('Connection test failed:', error);
                                  showFeedback(
                                    'error',
                                    'Connection Test Failed',
                                    `Connection test failed: ${error}`
                                  );
                                }
                              }}
                            >
                              Test Connection
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                showFeedback(
                                  'info',
                                  'Send Feedback',
                                  'We value your input! Please share your thoughts or report any issues you encounter.'
                                );
                              }}
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Feedback
                            </Button>
                          </div>
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

      <FeedbackModal
        open={feedbackModalOpen}
        onOpenChange={setFeedbackModalOpen}
        title={feedbackTitle}
        description={feedbackDescription}
        type={feedbackType}
        showConfirmation={showDeleteConfirm}
        onConfirm={() => {
          if (configToDelete) {
            deleteTestConfig(configToDelete);
          }
        }}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setConfigToDelete(null);
        }}
        showContactForm={feedbackType === 'info'}
        onSubmitFeedback={handleFeedbackSubmit}
      />
    </main>
  );
}
