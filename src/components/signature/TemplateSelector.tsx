'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  selectedTemplate: 'classic' | 'modern' | 'minimal';
  onTemplateChange: (templateId: 'classic' | 'modern' | 'minimal') => void;
}

export function TemplateSelector({ selectedTemplate, onTemplateChange }: TemplateSelectorProps) {
  const templates = [
    {
      id: 'classic' as const,
      name: 'Classic',
      description: 'Traditional layout with clear hierarchy',
      preview: (
        <div className="text-xs space-y-1">
          <div>
            <strong>John Smith</strong> | Marketing Manager
          </div>
          <div>
            <strong>Acme Corporation</strong>
          </div>
          <div>📧 john@acme.com | 📞 +27 11 123 4567</div>
          <div>🌐 www.acme.com</div>
          <div className="w-8 h-4 bg-gray-200 rounded mt-1"></div>
        </div>
      ),
    },
    {
      id: 'modern' as const,
      name: 'Modern',
      description: 'Logo alongside name with clean contact info',
      preview: (
        <div className="text-xs space-y-1">
          <div className="flex items-start gap-2">
            <div className="w-6 h-6 bg-gray-200 rounded"></div>
            <div>
              <div>
                <strong>John Smith</strong>
              </div>
              <div className="text-gray-600">Marketing Manager at Acme</div>
            </div>
          </div>
          <div className="border-t pt-1 text-gray-600">📧 john@acme.com | 📞 +27 11 123 4567</div>
        </div>
      ),
    },
    {
      id: 'minimal' as const,
      name: 'Minimal',
      description: 'Clean and simple with essential info only',
      preview: (
        <div className="text-xs space-y-1">
          <div>
            <strong>John Smith</strong>
          </div>
          <div className="text-gray-600">Marketing Manager, Acme Corporation</div>
          <div>john@acme.com | +27 11 123 4567</div>
          <div>www.acme.com</div>
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

              <div className="bg-gray-50 p-3 rounded border">{template.preview}</div>

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
