---
inclusion: fileMatch
fileMatchPattern: "**/templates/**"
---

# SignatureCraft Template System Guidelines

## Template Architecture

### Core Principles
- **Component-Based**: Each template is a standalone React component
- **Type Safety**: Full TypeScript support with strict interfaces
- **Metadata-Driven**: Templates include self-describing metadata
- **Registry System**: Central registry for automatic template discovery
- **Error Handling**: Graceful fallbacks for rendering failures

### Template Component Interface
```typescript
// Required interface for all template components
export interface TemplateProps {
  // User information
  name: string;
  title?: string;
  company?: string;
  email: string;
  phone?: string;
  website?: string;
  
  // Visual customization
  logoData?: string; // Base64 encoded image
  primaryColor?: string; // HEX color code
  secondaryColor?: string; // HEX color code
  
  // Additional options
  className?: string;
  showMobile?: boolean; // For responsive preview
}

// Metadata for template discovery and selection
export interface TemplateMetadata {
  id: string; // Unique identifier (e.g., "classic")
  name: string; // Display name (e.g., "Classic Template")
  description: string; // Short description for UI
  previewImage?: string; // Optional preview image URL
}

// Combined type for template components with metadata
export type TemplateComponent = React.FC<TemplateProps> & {
  metadata: TemplateMetadata;
};
```

### Template Registry System
```typescript
// Template registry in src/components/signature/templates/index.ts
import { ClassicTemplate } from './classic';
import { ModernTemplate } from './modern';
import { MinimalTemplate } from './minimal';
import type { TemplateComponent } from './types';

// Registry of all available templates
export const TEMPLATES: Record<string, TemplateComponent> = {
  [ClassicTemplate.metadata.id]: ClassicTemplate,
  [ModernTemplate.metadata.id]: ModernTemplate,
  [MinimalTemplate.metadata.id]: MinimalTemplate,
};

// Helper to get template by ID with type safety
export function getTemplateById(id: string): TemplateComponent {
  return TEMPLATES[id] || ClassicTemplate; // Fallback to Classic
}

// Export types for use in other components
export type { TemplateProps, TemplateMetadata, TemplateComponent } from './types';
```

## Template Implementation Guidelines

### HTML Structure
- Use semantic HTML elements where appropriate
- Use table-based layouts for email compatibility
- Ensure all elements have proper ARIA attributes
- Include fallbacks for missing data

### CSS Styling
- Use inline styles for email compatibility
- Apply brand colors from props (primaryColor, secondaryColor)
- Ensure responsive design with mobile-first approach
- Use consistent font sizes and spacing

### Email Compatibility
- Test templates in Gmail, Outlook, and Apple Mail
- Avoid CSS properties not supported in email clients
- Use table-based layouts instead of flexbox or grid
- Include proper image handling for email clients

### Error Handling
- Provide fallbacks for missing data (e.g., no logo)
- Handle null or undefined props gracefully
- Use conditional rendering for optional elements
- Include error boundaries for template rendering

## Template Preview Environment

### Development Workflow
1. Create new template component following interface
2. Add metadata to template component
3. Register template in registry system
4. Test template in preview environment
5. Verify email client compatibility

### Preview Environment Features
- Real-time preview with sample data
- Desktop and mobile view modes
- Export testing for email clients
- Visual comparison between templates
- Template documentation and usage guidelines

### Sample Data Testing
- Test with complete data set
- Test with minimal required fields
- Test with missing optional fields
- Test with very long text values
- Test with special characters

## Template Export System

### Export Formats
- **Gmail**: HTML format with inline styles
- **Outlook**: Rich text format for Outlook editor
- **Apple Mail**: Optimized format for Apple Mail
- **Generic HTML**: Clean HTML for download

### Export Process
1. Render template component to string
2. Process HTML for target email client
3. Copy to clipboard in appropriate format
4. Provide success/error feedback to user
5. Include setup instructions for email client

### Error Handling
- Handle clipboard API failures
- Provide manual copy fallback
- Show clear error messages
- Include retry mechanisms
- Log errors for debugging