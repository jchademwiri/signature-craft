# UI Standards for SignatureCraft

## Component Usage

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