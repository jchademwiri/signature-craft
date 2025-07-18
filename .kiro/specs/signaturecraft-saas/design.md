# SignatureCraft Design Specification

## Architecture Overview

SignatureCraft follows a modern web application architecture using Next.js with the App Router pattern. The application is structured to provide a seamless user experience while maintaining separation of concerns and code organization.

### High-Level Architecture

```
Client (Browser) <-> Next.js App Router <-> Supabase (Auth, Database, Storage)
                                        <-> Paystack (Payments)
                                        <-> Resend (Email Delivery)
```

## Frontend Design

### UI Framework
- Next.js 15.4.1 with App Router
- React 19.1.0
- TypeScript with strict mode
- Tailwind CSS v4 for styling
- ShadCN UI for component library
- Custom UI components for layout consistency

### Page Structure

#### Home Page (`src/app/page.tsx`)
- Hero section with logo and tagline
- Feature highlights with cards
- Call-to-action buttons
- Key features section with three main value propositions:
  - Drag & Drop interface
  - Branding capabilities
  - Social Media integration

#### Authentication Pages
- Sign up
- Sign in
- Password reset
- Email verification

#### Dashboard
- User signature management
- Team management (for team accounts)
- Settings and profile

#### Signature Builder
- Canvas area for signature design
- Component toolbar
- Property editor
- Preview panel
- Export options

### Component Design

#### UI Components
- Leveraging ShadCN UI components for consistent design
- Custom components built on top of ShadCN UI
- Container component for consistent content width and padding
- Responsive design for all screen sizes

#### Layout Components
- Root layout with navigation and footer
- Container component for consistent content width and padding
- Authentication layout
- Dashboard layout
- Builder layout

## Backend Design

### Database Schema

#### Users Table
- id (primary key)
- email
- name
- created_at
- updated_at
- subscription_tier
- subscription_status

#### Teams Table
- id (primary key)
- name
- owner_id (foreign key to users)
- created_at
- updated_at

#### Team Members Table
- id (primary key)
- team_id (foreign key to teams)
- user_id (foreign key to users)
- role (enum: admin, member)
- created_at
- updated_at

#### Signatures Table
- id (primary key)
- user_id (foreign key to users)
- team_id (foreign key to teams, nullable)
- name
- content (JSON)
- created_at
- updated_at

#### Templates Table
- id (primary key)
- user_id (foreign key to users)
- team_id (foreign key to teams, nullable)
- name
- content (JSON)
- is_public (boolean)
- created_at
- updated_at

### API Design

#### Authentication Endpoints
- POST /api/auth/signup
- POST /api/auth/signin
- POST /api/auth/signout
- POST /api/auth/reset-password
- POST /api/auth/verify-email

#### Signature Endpoints
- GET /api/signatures
- GET /api/signatures/:id
- POST /api/signatures
- PUT /api/signatures/:id
- DELETE /api/signatures/:id
- POST /api/signatures/:id/export

#### Team Endpoints
- GET /api/teams
- GET /api/teams/:id
- POST /api/teams
- PUT /api/teams/:id
- DELETE /api/teams/:id
- GET /api/teams/:id/members
- POST /api/teams/:id/members
- DELETE /api/teams/:id/members/:userId

#### Template Endpoints
- GET /api/templates
- GET /api/templates/:id
- POST /api/templates
- PUT /api/templates/:id
- DELETE /api/templates/:id

## Email System Design

### Email Templates
- Welcome email
- Password reset email
- Team invitation email
- Subscription update email

### Email Components
- EmailLayout component for consistent branding
- Header with logo
- Footer with legal information and links
- Button component for CTAs
- Text components for consistent styling

## Payment System Design

### Subscription Tiers
- Free: Basic features, limited to 1 signature
- Pro: Full features for individual users
- Team: Team management capabilities

### Payment Flow
1. User selects subscription tier
2. User redirected to Paystack checkout
3. On successful payment, subscription status updated
4. User redirected to dashboard with new capabilities

## Deployment Architecture

### Vercel Deployment
- Production environment
- Preview environments for pull requests
- Environment variables for configuration

### CI/CD Pipeline
- Automated testing on pull requests
- Automated deployment on merge to main branch
- Environment-specific configuration

## Security Design

### Authentication Security
- Email/password authentication with Supabase Auth
- JWT token-based session management
- Password reset flow with secure tokens

### Data Security
- Row-level security in Supabase
- Input validation on all API endpoints
- CSRF protection
- XSS prevention

### File Upload Security
- File type validation
- File size limits
- Secure storage in Supabase Storage

## Performance Considerations

### Frontend Performance
- Static generation for public pages
- Server components for dynamic content
- Image optimization with Next.js Image component
- Code splitting and lazy loading

### Backend Performance
- Efficient database queries with indexes
- Caching strategies for frequently accessed data
- Rate limiting for API endpoints