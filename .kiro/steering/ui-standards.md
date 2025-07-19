---
inclusion: fileMatch
fileMatchPattern: "**/*.tsx"
---

# SignatureCraft MVP UI Standards & Component Guidelines

## Component Usage (Strict Requirements)

### ShadCN UI Components
- Use ShadCN UI components for consistent design language
- Follow the component structure as defined in the documentation
- Use proper component composition (e.g., Card with CardHeader, CardContent, CardFooter)
- Utilize CardDescription for secondary text content

### Tailwind Classes
- Use `text-primary` for primary brand color highlights
- Use `text-muted-foreground` for secondary text content
- Use proper spacing utilities (mb-8, mt-16, etc.)
- Follow responsive design patterns with breakpoints (sm:, md:, etc.)
- Use grid layouts with appropriate column configurations

### Layout Patterns
- Center content with `flex flex-col items-center`
- Use Container component for consistent content width and padding
- Use max-width constraints for content areas (max-w-4xl)
- Apply consistent padding with `px-4 md:px-6` via Container component
- Use Separator component for visual dividers

## Typography
- Use text-4xl for main headings
- Use text-3xl for section headings
- Use text-2xl for card titles
- Apply font-bold for headings and font-semibold for subheadings
- Use text-xl for larger body text

## Button Styles
- Use default variant for primary actions
- Use outline variant for secondary actions
- Place buttons in CardFooter when used within cards

## Card Patterns
- Use Card component for feature highlights
- Include CardHeader with CardTitle and optional CardDescription
- Use CardContent for main content
- Use CardFooter for actions

## Image Handling
- Use Next.js Image component for optimized images
- Set appropriate width and height
- Use priority attribute for above-the-fold images

## Responsive Design
- Use grid-cols-1 as base, then increase columns at breakpoints
- Apply responsive padding and margins
- Ensure text remains readable at all viewport sizes

## SignatureCraft MVP Specific Patterns

### Landing Page Layout
```tsx
<Container className="flex flex-col items-center">
  <div className="text-center mb-16">
    <h1 className="text-4xl font-bold mb-4">
      Professional email signatures in 3 clicks
    </h1>
    <p className="text-xl text-muted-foreground mb-8">
      No design skills required
    </p>
    <Button size="lg">Create Your Signature</Button>
  </div>
</Container>
```

### Signature Builder Layout
```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  <Card>
    <CardHeader>
      <CardTitle>Your Information</CardTitle>
    </CardHeader>
    <CardContent>
      {/* Form fields */}
    </CardContent>
  </Card>
  
  <Card>
    <CardHeader>
      <CardTitle>Preview</CardTitle>
    </CardHeader>
    <CardContent>
      {/* Live signature preview */}
    </CardContent>
  </Card>
  
  <Card>
    <CardHeader>
      <CardTitle>Templates</CardTitle>
    </CardHeader>
    <CardContent>
      {/* Template selector */}
    </CardContent>
  </Card>
</div>
```

### Template Selection UI
```tsx
<div className="grid grid-cols-1 gap-4">
  {templates.map((template) => (
    <Card key={template.id} className="cursor-pointer hover:border-primary">
      <CardContent className="p-4">
        <div className="text-sm">
          {/* Template preview */}
        </div>
      </CardContent>
    </Card>
  ))}
</div>
```

### Export Panel UI
```tsx
<Card>
  <CardHeader>
    <CardTitle>Export Your Signature</CardTitle>
    <CardDescription>
      Copy and paste directly into your email client
    </CardDescription>
  </CardHeader>
  <CardContent>
    <div className="space-y-4">
      <Button className="w-full">Copy for Gmail</Button>
      <Button variant="outline" className="w-full">Copy for Outlook</Button>
    </div>
  </CardContent>
  <CardFooter>
    <Button variant="ghost" className="w-full">Download .htm file</Button>
  </CardFooter>
</Card>
```

### Form Field Patterns
```tsx
<div className="space-y-4">
  <div>
    <Label htmlFor="name">Full Name *</Label>
    <Input id="name" placeholder="John Doe" required />
  </div>
  <div>
    <Label htmlFor="title">Job Title</Label>
    <Input id="title" placeholder="Software Developer" />
  </div>
</div>
```

### Logo Upload Component
```tsx
<Card className="border-2 border-dashed border-muted">
  <CardContent className="p-6 text-center">
    <div className="space-y-2">
      <div className="text-muted-foreground">
        Drag and drop your logo here
      </div>
      <Button variant="outline">Choose File</Button>
      <div className="text-xs text-muted-foreground">
        PNG, JPG, SVG up to 2MB
      </div>
    </div>
  </CardContent>
</Card>
```

### Error Handling UI
```tsx
// Form validation errors
<div className="text-sm text-destructive">
  Please enter a valid email address
</div>

// Loading states
<Button disabled>
  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  Creating signature...
</Button>
```

### Mobile Optimization
- Touch targets minimum 44px height
- Form inputs with proper spacing on mobile
- Responsive grid layouts that stack on mobile
- Easy-to-tap buttons and interactive elements

### Accessibility Requirements
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text for all images
- Form labels associated with inputs
- Keyboard navigation support
- Color contrast compliance (WCAG 2.1 AA)

### Performance Considerations
- Use Next.js Image component for logo uploads
- Lazy load non-critical components
- Minimize client-side JavaScript
- Optimize for Core Web Vitals (<3s load time)