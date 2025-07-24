'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { FormFields } from './FormFields';
import { SignaturePreview } from './SignaturePreview';
import { TemplateSelector } from './TemplateSelector';
import { BrandColors } from './BrandColors';

export interface SignatureData {
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  logoData?: string;
  templateId: 'classic' | 'modern' | 'minimal' | 'corporate';
  primaryColor?: string;
  secondaryColor?: string;
  address?: string;
}

export function SignatureBuilder({ editId }: { editId?: string }) {
  const router = useRouter();
  const [signatureData, setSignatureData] = useState<SignatureData>({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    address: '',
    logoData: '/logo.svg',
    templateId: 'corporate', //set defult template
    primaryColor: '#0066cc',
    secondaryColor: '#004499',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editId) {
      setIsLoading(true);
      fetch(`/api/signatures?id=${editId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && !data.error) {
            // Convert nulls to empty strings or undefined for controlled inputs
            const safeData = {
              ...signatureData,
              ...Object.fromEntries(
                Object.entries(data).map(([key, value]) => [
                  key,
                  value ?? (key === 'logoData' ? undefined : ''),
                ])
              ),
            };
            setSignatureData(safeData);
          }
        })
        .finally(() => setIsLoading(false));
    }
  }, [editId]);

  const handleDataChange = (field: keyof SignatureData, value: string) => {
    setSignatureData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (!signatureData.name || !signatureData.email) {
      alert('Please fill in your name and email address');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch('/api/signatures', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signatureData),
      });

      if (response.ok) {
        // Navigate to dashboard with success message
        router.push('/dashboard?saved=true');
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save signature');
      }
    } catch (error) {
      console.error('Error saving signature:', error);
      alert('Failed to save signature. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row gap-4 lg:gap-6">
      {/* Left Column: Form Fields (Scrollable) */}
      <div className="flex-1">
        <Card className="h-full">
          <CardContent className="p-0 h-full">
            <Tabs defaultValue="contact" className="h-full flex flex-col">
              <div className="border-b px-6 pt-6 flex-shrink-0">
                <TabsList className="grid w-full grid-cols-3 h-12 lg:h-10">
                  <TabsTrigger value="contact" className="text-xs lg:text-sm px-2 lg:px-4">
                    Contact Info
                  </TabsTrigger>
                  <TabsTrigger value="colors" className="text-xs lg:text-sm px-2 lg:px-4">
                    Brand Colors
                  </TabsTrigger>
                  <TabsTrigger value="template" className="text-xs lg:text-sm px-2 lg:px-4">
                    Template
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="flex-1 min-h-0">
                <TabsContent value="contact" className="mt-0 h-full overflow-y-auto p-6">
                  <FormFields data={signatureData} onChange={handleDataChange} />
                </TabsContent>

                <TabsContent value="colors" className="mt-0 h-full overflow-y-auto p-6">
                  <BrandColors data={signatureData} onChange={handleDataChange} />
                </TabsContent>

                <TabsContent value="template" className="mt-0 h-full overflow-y-auto p-6">
                  <TemplateSelector
                    selectedTemplate={signatureData.templateId}
                    onTemplateChange={(templateId) => handleDataChange('templateId', templateId)}
                  />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Right Column: Preview (Sticky) */}
      <div className="flex-1">
        <Card className="h-[calc(100vh-8rem)] flex flex-col">
          <CardHeader className="flex-shrink-0">
            <CardTitle>Live Preview</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            <SignaturePreview data={signatureData} onSave={handleSave} isSaving={isSaving} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
