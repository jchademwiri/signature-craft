import { JSX } from "react";

/**
 * Props interface for all signature templates
 * Contains all fields that can be used in a signature template
 */
export interface TemplateProps {
  // Required fields
  name: string;
  email: string;
  
  // Optional fields
  title?: string;
  company?: string;
  department?: string;
  address?: string;
  phone?: string;
  mobile?: string;
  website?: string;
  
  // Visual customization
  logoData?: string;
  primaryColor?: string;
  secondaryColor?: string;
  
  // Future extensibility fields
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
    [key: string]: string | undefined; // Allow for additional social platforms
  };
  
  // Additional custom fields for future use
  additionalFields?: Record<string, string>;
  
  // Custom styling options for future use
  customStyles?: {
    fontFamily?: string;
    fontSize?: string;
    [key: string]: string | undefined;
  };
}

/**
 * Metadata interface for template identification and display
 */
export interface TemplateMetadata {
  // Core identification
  id: string;
  name: string;
  description: string;
  
  // Display properties
  previewImage?: string; // Optional path to a static preview image
  
  // Template categorization
  category?: 'professional' | 'creative' | 'minimal' | 'custom';
  tags?: string[]; // For filtering and searching templates
  
  // Version control
  version?: string;
  
  // Author information
  author?: {
    name: string;
    email?: string;
  };
}

/**
 * Template component interface that combines the React component with its metadata
 */
export interface TemplateComponent {
  (props: TemplateProps): JSX.Element;
  metadata: TemplateMetadata;
}

/**
 * Email client compatibility types for export functionality
 */
export type EmailClient = 'gmail' | 'outlook' | 'apple-mail' | 'generic';

/**
 * Export format options for different email clients
 */
export interface ExportOptions {
  format: 'html' | 'rtf' | 'text';
  emailClient: EmailClient;
  includeImages: boolean;
  inlineStyles: boolean;
}
