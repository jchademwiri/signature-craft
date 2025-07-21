# Template Integration Tasklist for SignatureCraft

## 1. Template Structure Implementation

- [ ] Create `types.ts` with TemplateProps, TemplateMetadata, and TemplateComponent interfaces
- [ ] Update `classic.tsx` to include metadata and follow new component structure
- [ ] Create `modern.tsx` template component with metadata
- [ ] Create `minimal.tsx` template component with metadata
- [ ] Ensure all templates have consistent props interface and styling

## 2. Template Registry Setup

- [ ] Create `index.ts` to export all templates and their metadata
- [ ] Set up TEMPLATES registry using component metadata
- [ ] Export proper TypeScript types for template IDs and props

## 3. Update Template Selector Component

- [ ] Import templates from the new registry
- [ ] Use template metadata (name, description) in the UI
- [ ] Display template previews using the actual components
- [ ] Ensure template switching preserves all form data

## 4. Update Signature Preview Component

- [ ] Modify to use the new template components for rendering
- [ ] Pass all required props including colors to templates
- [ ] Maintain mobile/desktop preview functionality

## 5. Fix Email Client Export Issues

- [ ] Investigate why HTML is pasted instead of formatted content
- [ ] Modify HTML generation to be compatible with email clients
- [ ] For Gmail: Ensure HTML is properly formatted for Gmail''s editor
- [ ] For Outlook: Create rich text format that Outlook can interpret
- [ ] Remove "Copy HTML" option
- [ ] Add "Copy for Apple Mail" option

## 6. Email Client Compatibility

- [ ] Test HTML output in Gmail web interface
- [ ] Test HTML output in Outlook desktop and web
- [ ] Test HTML output in Apple Mail
- [ ] Ensure images are properly embedded as base64
- [ ] Verify inline styles are preserved when pasted

## 7. Template HTML Generation

- [ ] Create utility functions to generate email-compatible HTML
- [ ] Implement different output formats for each email client:
  - [ ] Gmail: HTML with specific formatting
  - [ ] Outlook: Rich text compatible format
  - [ ] Apple Mail: Format optimized for Apple Mail

## Implementation Notes

### Email Client Export Issues

When copying HTML to clipboard and pasting into email clients, the clients often strip formatting or paste the raw HTML. To fix this:

1. **For Gmail**: 
   - Generate HTML that preserves formatting when pasted into Gmail''s signature editor
   - Use table-based layouts with inline styles
   - Test with the actual Gmail interface

2. **For Outlook**:
   - Create a rich text format that Outlook can interpret
   - Consider using a different approach than direct HTML copy-paste
   - May need to provide step-by-step instructions for users

3. **For Apple Mail**:
   - Research Apple Mail''s signature import capabilities
   - Create a format that preserves styling when pasted
   - Consider providing a downloadable file option if direct paste doesn''t work

### Template Component Structure

Each template should follow this structure:

```typescript
import { TemplateProps, TemplateComponent } from ''./types'';

export const TemplateName: TemplateComponent = (props: TemplateProps) => {
  // Template rendering logic
  return (
    // Template JSX
  );
};

// Add metadata to the component
TemplateName.metadata = {
  id: ''template-id'',
  name: ''Template Display Name'',
  description: ''Brief description of the template style'',
};
```

### Testing Process

For each email client:
1. Generate signature HTML
2. Copy to clipboard
3. Paste into email client''s signature editor
4. Verify formatting is preserved
5. Send test email to verify signature appears correctly
