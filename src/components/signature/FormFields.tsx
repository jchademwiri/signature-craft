"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { LogoUpload } from "./LogoUpload";
import { SignatureData } from "./SignatureBuilder";

interface FormFieldsProps {
  data: SignatureData;
  onChange: (field: keyof SignatureData, value: string) => void;
}

export function FormFields({ data, onChange }: FormFieldsProps) {
  return (
    <div className="space-y-6">
      {/* Required Fields */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Required Information
        </h3>
        
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            type="text"
            placeholder="John Smith"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
            className="h-12 lg:h-10 text-base lg:text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-200"
            aria-required="true"
            aria-describedby={data.name ? undefined : "name-help"}
            required
          />
          {!data.name && (
            <p id="name-help" className="text-xs text-muted-foreground mt-1">
              Enter your full name as you want it to appear in your signature
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@company.com"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="h-12 lg:h-10 text-base lg:text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-200"
            aria-required="true"
            aria-describedby={data.email ? undefined : "email-help"}
            required
          />
          {!data.email && (
            <p id="email-help" className="text-xs text-muted-foreground mt-1">
              Enter your professional email address
            </p>
          )}
        </div>
      </div>

      <Separator />

      {/* Professional Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Professional Details
        </h3>

        <div className="space-y-2">
          <Label htmlFor="title">Job Title</Label>
          <Input
            id="title"
            type="text"
            placeholder="Marketing Manager"
            value={data.title}
            onChange={(e) => onChange("title", e.target.value)}
            className="h-12 lg:h-10 text-base lg:text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            type="text"
            placeholder="Acme Corporation"
            value={data.company}
            onChange={(e) => onChange("company", e.target.value)}
            className="h-12 lg:h-10 text-base lg:text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-200"
          />
        </div>


      </div>

      <Separator />

      {/* Contact Information */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Contact Details
        </h3>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+27 11 123 4567"
            value={data.phone}
            onChange={(e) => onChange("phone", e.target.value)}
            className="h-12 lg:h-10 text-base lg:text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-200"
          />
        </div>



        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            type="url"
            placeholder="https://www.company.com"
            value={data.website}
            onChange={(e) => onChange("website", e.target.value)}
            className="h-12 lg:h-10 text-base lg:text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Office Address</Label>
          <Input
            id="address"
            type="text"
            placeholder="123 Main St, City, Country"
            value={data.address}
            onChange={(e) => onChange("address", e.target.value)}
            className="h-12 lg:h-10 text-base lg:text-sm focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors duration-200"
          />
        </div>


      </div>

      <Separator />

      {/* Logo Upload */}
      <div className="space-y-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
          Company Logo
        </h3>
        <LogoUpload
          logoData={data.logoData}
          onLogoChange={(logoData) => onChange("logoData", logoData || "")}
        />
      </div>
    </div>
  );
}