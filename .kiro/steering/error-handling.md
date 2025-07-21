---
inclusion: fileMatch
fileMatchPattern: "**/*.tsx"
---

# SignatureCraft Error Handling & User Experience Guidelines

## Error Handling Principles

### Core Principles
- **Graceful Degradation**: Provide fallbacks when primary functionality fails
- **User-Friendly Messages**: Clear, actionable error messages for users
- **Comprehensive Coverage**: Handle all potential failure points
- **Logging**: Proper error logging for debugging and monitoring
- **Recovery**: Provide retry mechanisms where appropriate

### Error Boundaries
- Implement React error boundaries around critical components
- Provide fallback UI when components fail to render
- Log component errors for debugging
- Allow users to retry or reset failed components

```tsx
// Example error boundary implementation
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="p-4 border border-destructive rounded-md">
      <h3 className="text-lg font-medium">Something went wrong</h3>
      <p className="text-sm text-muted-foreground">{error.message}</p>
      <Button onClick={resetErrorBoundary} className="mt-4">
        Try again
      </Button>
    </div>
  );
}

// Usage
<ErrorBoundary FallbackComponent={ErrorFallback}>
  <TemplateComponent {...props} />
</ErrorBoundary>
```

### Form Validation Errors
- Use React Hook Form with Zod for validation
- Show inline validation errors under form fields
- Highlight fields with errors using red border
- Provide clear instructions for fixing errors
- Prevent form submission until errors are fixed

```tsx
// Example form validation
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
});

function SignatureForm() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '' },
  });
  
  // Form implementation
}
```

### API Error Handling
- Handle network errors gracefully
- Show appropriate error messages for API failures
- Implement retry mechanisms for transient errors
- Cache data when possible to handle offline scenarios
- Log API errors for debugging

```tsx
// Example API error handling
async function handleSubmit() {
  try {
    setLoading(true);
    await api.createSignature(data);
    showSuccess('Signature created successfully');
  } catch (error) {
    if (error.status === 401) {
      showError('Your session has expired. Please log in again.');
    } else if (error.status === 429) {
      showError('Too many requests. Please try again later.');
    } else {
      showError('Failed to create signature. Please try again.');
    }
    logError('Signature creation failed', error);
  } finally {
    setLoading(false);
  }
}
```

### Clipboard Operation Errors
- Handle clipboard API permissions issues
- Provide manual copy fallback when automatic copy fails
- Show clear success/error messages for copy operations
- Test clipboard operations across different browsers
- Include instructions for manual copying if needed

```tsx
// Example clipboard error handling
async function copyToClipboard(html) {
  try {
    await navigator.clipboard.writeText(html);
    showSuccess('Copied to clipboard!');
  } catch (error) {
    showError('Could not copy automatically');
    showManualCopyInstructions(html);
    logError('Clipboard operation failed', error);
  }
}
```

## User Experience Guidelines

### Loading States
- Show loading indicators for all async operations
- Use skeleton loaders for content that's loading
- Disable buttons during form submission
- Show progress indicators for long operations
- Ensure loading states are accessible

```tsx
// Example loading state
<Button disabled={loading}>
  {loading ? (
    <>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Creating...
    </>
  ) : (
    'Create Signature'
  )}
</Button>
```

### Success Feedback
- Show toast notifications for successful operations
- Use green color for success messages
- Include clear confirmation of what was completed
- Auto-dismiss success messages after a few seconds
- Provide next steps when appropriate

```tsx
// Example success feedback
function showSuccess(message) {
  toast({
    title: 'Success',
    description: message,
    variant: 'success',
    duration: 3000,
  });
}
```

### Error Feedback
- Show toast notifications for errors
- Use red color for error messages
- Include clear explanation of what went wrong
- Provide actionable steps to resolve the issue
- Allow users to dismiss error messages

```tsx
// Example error feedback
function showError(message) {
  toast({
    title: 'Error',
    description: message,
    variant: 'destructive',
    duration: 5000,
  });
}
```

### Form Interaction
- Show validation errors as users type
- Provide real-time feedback for field requirements
- Use clear labels and placeholder text
- Include helper text for complex fields
- Auto-focus first field in forms

### Responsive Design
- Ensure all UI elements work on mobile devices
- Use appropriate touch targets (minimum 44px)
- Test on various screen sizes and orientations
- Ensure error messages are visible on all devices
- Optimize loading states for mobile networks

## Performance Considerations

### Optimizations
- Implement lazy loading for non-critical components
- Use React.memo for expensive components
- Optimize re-renders with useMemo and useCallback
- Implement proper loading states for perceived performance
- Monitor and optimize Core Web Vitals

### Monitoring
- Track error rates in production
- Monitor performance metrics
- Set up alerts for critical errors
- Collect user feedback on errors
- Regularly review error logs and fix issues