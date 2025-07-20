"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Palette, RotateCcw } from "lucide-react";
import { SignatureData } from "./SignatureBuilder";

interface BrandColorsProps {
  data: SignatureData;
  onChange: (field: keyof SignatureData, value: string) => void;
}

export function BrandColors({ data, onChange }: BrandColorsProps) {
  const presetColors = [
    { name: "Corporate Blue", primary: "#0066cc", secondary: "#004499" },
    { name: "Professional Green", primary: "#2d7d32", secondary: "#1b5e20" },
    { name: "Elegant Gray", primary: "#424242", secondary: "#212121" },
  ];

  const handlePresetSelect = (preset: typeof presetColors[0]) => {
    onChange("primaryColor", preset.primary);
    onChange("secondaryColor", preset.secondary);
  };

  const handleReset = () => {
    onChange("primaryColor", "#0066cc");
    onChange("secondaryColor", "#004499");
  };

  return (
    <div className="space-y-6">
      {/* Color Inputs */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Custom Colors
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Primary Color</Label>
            <div className="flex gap-2">
              <Input
                id="primaryColor"
                type="color"
                value={data.primaryColor || "#0066cc"}
                onChange={(e) => onChange("primaryColor", e.target.value)}
                className="w-16 h-12 lg:h-10 p-1 border rounded cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Select primary brand color"
              />
              <Input
                type="text"
                value={data.primaryColor || "#0066cc"}
                onChange={(e) => onChange("primaryColor", e.target.value)}
                placeholder="#0066cc"
                className="flex-1 h-12 lg:h-10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Enter primary color hex code"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="secondaryColor">Secondary Color</Label>
            <div className="flex gap-2">
              <Input
                id="secondaryColor"
                type="color"
                value={data.secondaryColor || "#004499"}
                onChange={(e) => onChange("secondaryColor", e.target.value)}
                className="w-16 h-12 lg:h-10 p-1 border rounded cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Select secondary brand color"
              />
              <Input
                type="text"
                value={data.secondaryColor || "#004499"}
                onChange={(e) => onChange("secondaryColor", e.target.value)}
                placeholder="#004499"
                className="flex-1 h-12 lg:h-10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label="Enter secondary color hex code"
              />
            </div>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="w-full h-12 lg:h-10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-200"
          aria-label="Reset colors to default corporate blue theme"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Default
        </Button>
      </div>

      {/* Color Presets */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Color Presets
        </h3>
        
        <div className="grid grid-cols-1 gap-3">
          {presetColors.map((preset, index) => (
            <Card 
              key={index}
              role="button"
              tabIndex={0}
              aria-label={`Select ${preset.name} color preset`}
              className="cursor-pointer hover:shadow-lg hover:border-primary/50 hover:scale-[1.02] transition-all duration-200 group"
              onClick={() => handlePresetSelect(preset)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handlePresetSelect(preset);
                }
              }}
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      <div 
                        className="w-6 h-6 rounded border shadow-sm"
                        style={{ backgroundColor: preset.primary }}
                        aria-label={`Primary color: ${preset.primary}`}
                      />
                      <div 
                        className="w-6 h-6 rounded border shadow-sm"
                        style={{ backgroundColor: preset.secondary }}
                        aria-label={`Secondary color: ${preset.secondary}`}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium group-hover:text-primary transition-colors duration-200">{preset.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {preset.primary} • {preset.secondary}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-10 w-10 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePresetSelect(preset);
                    }}
                    aria-label={`Apply ${preset.name} color preset`}
                  >
                    <Palette className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Color Preview */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Color Preview
        </h3>
        
        <Card className="p-6 bg-white border">
          <div className="space-y-2 font-sans">
            <div 
              className="font-bold text-lg leading-tight"
              style={{ color: "#333333" }}
            >
              {data.name || "Your Name"}
            </div>
            <div 
              className="text-sm leading-tight"
              style={{ color: data.secondaryColor || "#004499" }}
            >
              {data.title || "Job Title"} • {data.company || "Company Name"}
            </div>
            <div className="text-sm leading-tight">
              <span 
                className="font-medium"
                style={{ color: data.primaryColor || "#0066cc" }}
              >
                {data.email || "email@company.com"}
              </span>
              <span className="text-gray-400 mx-2">•</span>
              <span 
                className="font-medium"
                style={{ color: data.primaryColor || "#0066cc" }}
              >
                {data.phone || "+27 11 123 4567"}
              </span>
            </div>
          </div>
        </Card>
        
        <p className="text-xs text-muted-foreground">
          Preview of how your brand colors will look in the signature
        </p>
      </div>
    </div>
  );
}