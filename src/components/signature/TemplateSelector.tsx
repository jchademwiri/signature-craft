'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: 'classic' | 'modern' | 'minimal' | 'corporate';
  onTemplateChange: (templateId: 'classic' | 'modern' | 'minimal' | 'corporate') => void;
  signatureData?: {
    name: string;
    title?: string;
    company?: string;
    email: string;
    phone?: string;
    website?: string;
    logoData?: string;
  };
}

export function TemplateSelector({
  selectedTemplate,
  onTemplateChange,
  signatureData,
}: TemplateSelectorProps) {
  // Use actual signature data or fallback to sample data
  const displayData = {
    name: signatureData?.name || 'John Smith',
    title: signatureData?.title || 'Marketing Manager',
    company: signatureData?.company || 'Acme Corporation',
    email: signatureData?.email || 'john@acme.com',
    phone: signatureData?.phone || '+27 11 123 4567',
    website: signatureData?.website || 'www.acme.com',
    hasLogo: !!signatureData?.logoData,
  };
  const templates = [
    {
      id: 'classic' as const,
      name: 'Classic',
      description: 'Traditional layout with clear hierarchy',
      preview: (
        <div className="text-xs space-y-1 text-gray-800">
          <div className="font-medium">
            <span className="text-black font-semibold">{displayData.name}</span>
            {displayData.title && <span className="text-gray-700"> | {displayData.title}</span>}
          </div>
          {displayData.company && (
            <div className="font-medium text-black">{displayData.company}</div>
          )}
          <div className="text-gray-700">
            📧 <span className="text-blue-600">{displayData.email}</span>
            {displayData.phone && <span> | 📞 {displayData.phone}</span>}
          </div>
          {displayData.website && (
            <div className="text-gray-700">
              🌐 <span className="text-blue-600">{displayData.website}</span>
            </div>
          )}
          {displayData.hasLogo && <div className="w-8 h-4 bg-gray-300 rounded mt-1"></div>}
        </div>
      ),
    },
    {
      id: 'modern' as const,
      name: 'Modern',
      description: 'Logo alongside name with clean contact info',
      preview: (
        <div className="text-xs space-y-1 text-gray-800">
          <div className="flex items-start gap-2">
            {displayData.hasLogo && (
              <div className="w-6 h-6 bg-gray-300 rounded flex-shrink-0"></div>
            )}
            <div>
              <div className="font-semibold text-black">{displayData.name}</div>
              <div className="text-gray-700">
                {displayData.title && displayData.company
                  ? `${displayData.title} at ${displayData.company}`
                  : displayData.title || displayData.company || ''}
              </div>
            </div>
          </div>
          <div className="border-t pt-1 text-gray-700">
            📧 <span className="text-blue-600">{displayData.email}</span>
            {displayData.phone && <span> | 📞 {displayData.phone}</span>}
          </div>
          {displayData.website && (
            <div className="text-gray-700">
              🌐 <span className="text-blue-600">{displayData.website}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'minimal' as const,
      name: 'Minimal Refined',
      description: 'Elegant minimal design with perfect typography',
      preview: (
        <div className="text-xs space-y-1 text-gray-800">
          <div className="flex items-start gap-2">
            {displayData.hasLogo && (
              <div className="w-5 h-5 bg-gray-300 rounded flex-shrink-0"></div>
            )}
            <div>
              <div className="font-semibold text-black">{displayData.name}</div>
              {(displayData.title || displayData.company) && (
                <div className="text-gray-700">
                  {displayData.title && displayData.company
                    ? `${displayData.title} • ${displayData.company}`
                    : displayData.title || displayData.company}
                </div>
              )}
            </div>
          </div>
          <div className="text-gray-700">
            <span className="text-blue-600 font-medium">{displayData.email}</span>
            {displayData.phone && <span className="text-gray-400"> • </span>}
            {displayData.phone && <span>{displayData.phone}</span>}
            {displayData.website && <span className="text-gray-400"> • </span>}
            {displayData.website && (
              <span className="text-blue-600 font-medium">{displayData.website}</span>
            )}
          </div>
          <div className="w-6 h-0.5 bg-gray-400 opacity-30 rounded"></div>
        </div>
      ),
    },
    {
      id: 'corporate' as const,
      name: 'Corporate Premium',
      description: 'Sophisticated premium design with card-style layout',
      preview: (
        <div className="text-xs bg-gray-50 p-2 rounded border text-gray-800">
          <div className="flex items-start gap-2 mb-2 pb-1 border-b border-gray-200">
            {displayData.hasLogo && (
              <div className="w-6 h-6 bg-gray-300 rounded flex-shrink-0"></div>
            )}
            <div>
              <div className="font-bold text-black text-sm">{displayData.name}</div>
              {(displayData.title || displayData.company) && (
                <div className="text-gray-700">
                  {displayData.title && <span>{displayData.title}</span>}
                  {displayData.title && displayData.company && (
                    <span className="text-blue-600 font-semibold"> @ </span>
                  )}
                  {displayData.company && (
                    <span className="font-semibold">{displayData.company}</span>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded text-white text-[8px] flex items-center justify-center">
                @
              </div>
              <span className="text-blue-600 font-medium">{displayData.email}</span>
            </div>
            {displayData.phone && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-gray-500 rounded text-white text-[8px] flex items-center justify-center">
                  ☎
                </div>
                <span>{displayData.phone}</span>
              </div>
            )}
            {displayData.website && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded text-white text-[8px] flex items-center justify-center">
                  🌐
                </div>
                <span className="text-blue-600 font-medium">{displayData.website}</span>
              </div>
            )}
          </div>
          <div className="w-full h-0.5 bg-blue-600 mt-2 rounded"></div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Choose a template that matches your professional style
      </p>

      <div className="space-y-3">
        {templates.map((template) => (
          <Card
            key={template.id}
            role="button"
            tabIndex={0}
            aria-label={`Select ${template.name} template - ${template.description}`}
            aria-pressed={selectedTemplate === template.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02] ${
              selectedTemplate === template.id
                ? 'ring-2 ring-primary border-primary shadow-lg'
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => onTemplateChange(template.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onTemplateChange(template.id);
              }
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-medium text-sm">{template.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{template.description}</p>
                </div>
                {selectedTemplate === template.id && (
                  <div className="flex-shrink-0 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Check className="h-3 w-3 text-foreground" />
                  </div>
                )}
              </div>

              <div className={template.id === 'corporate' ? '' : 'bg-gray-50 p-3 rounded border'}>
                {template.preview}
              </div>

              <Button
                variant={selectedTemplate === template.id ? 'default' : 'outline'}
                size="sm"
                className="w-full mt-3 transition-colors duration-200 h-10 lg:h-9"
                onClick={(e) => {
                  e.stopPropagation();
                  onTemplateChange(template.id);
                }}
              >
                {selectedTemplate === template.id ? 'Selected' : 'Select Template'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
