# 📋 **SignatureCraft MVP - Technical Requirements**
*Detailed Specifications for Development*

## 1. **Project Overview**

**Product**: SignatureCraft MVP - Professional Email Signature Builder  
**Timeline**: 6 weeks development + 2 weeks testing  
**Target**: South African professionals and SMBs  
**Core Goal**: Create professional email signatures in under 5 minutes  

**Current Status**: Phase 1 & 2 Complete (Foundation & Core Application) - Phase 3 In Progress (Export & Integration)  

---

## 2. **Functional Requirements**

### 2.1 **User Authentication System**

#### **Registration & Login**
- **Email/Password Registration**
  - Email validation (format + uniqueness)
  - Password requirements: minimum 8 characters
  - Email verification (optional for MVP)
  - Account activation flow

- **Login System**
  - Email/password authentication
  - Session management (7-day expiry)
  - "Remember me" functionality
  - Password reset via email (basic)

- **User Profile**
  - Basic profile management
  - Account settings page
  - Delete account option

#### **Acceptance Criteria**
```
✅ User can register with email/password (IMPLEMENTED)
✅ User receives confirmation email (MVP: Skipped email verification)
✅ User can login and stay logged in (IMPLEMENTED)
✅ User can reset password (IMPLEMENTED - logging to console for MVP)
✅ User can update profile information (IMPLEMENTED - Settings page)
```

**Implementation Status**: ✅ **COMPLETED** - Better Auth authentication system fully implemented with login, register, password reset, and profile management.

### 2.2 **Signature Builder System**

#### **Form Interface**
**Required Fields:**
- Full Name (text input)
- Job Title (text input)  
- Company Name (text input)
- Email Address (email input with validation)
- Phone Number (tel input with format validation)
- Website URL (url input, optional)

**Optional Fields:**
- Department (text input)
- Mobile Number (tel input)
- Office Address (textarea)

#### **Logo Upload System**
- **File Upload**: PNG, JPG, SVG support
- **Size Limit**: 2MB maximum
- **Automatic Optimization**: Resize to max 150px width
- **Storage**: Base64 encoding in database (MVP approach)
- **Preview**: Real-time logo preview in signature

#### **Template System**
**Template 1: Classic**
```
[Name] | [Title]
[Company]
📧 [Email] | 📞 [Phone]
🌐 [Website]
[Logo]
```

**Template 2: Modern**
```
[Logo] [Name]
       [Title] at [Company]
       
📧 [Email] | 📞 [Phone] | 🌐 [Website]
```

**Template 3: Minimal**
```
[Name]
[Title], [Company]
[Email] | [Phone]
```

#### **Real-time Preview**
- Live preview updates as user types
- Mobile/desktop preview toggle
- Email client preview modes (Gmail, Outlook)
- Copy-to-clipboard functionality

#### **Acceptance Criteria**
```
✅ User can fill out signature form (IMPLEMENTED)
✅ Form validates all required fields (IMPLEMENTED)
✅ User can upload and preview logo (IMPLEMENTED)
✅ User can select from 3 templates (IMPLEMENTED)
✅ Preview updates in real-time (IMPLEMENTED)
✅ User can copy HTML signature (IMPLEMENTED)
```

**Implementation Status**: ✅ **COMPLETED** - Full signature builder with mobile-optimized interface, real-time preview, and export functionality.

### 2.3 **Export & Installation System**

#### **HTML Generation**
- Clean, compatible HTML output
- Inline CSS for email client compatibility
- Fallback text for non-HTML email clients
- Mobile-responsive design
- Cross-client tested code

#### **Installation Guides**
**Gmail Installation:**
- Step-by-step screenshots
- Video tutorial (embedded YouTube)
- Troubleshooting section

**Outlook Installation:**
- Desktop Outlook guide
- Outlook.com web guide
- Mobile Outlook guide

**Apple Mail Installation:**
- macOS Mail app guide
- iOS Mail app guide

#### **Export Formats**
- HTML (primary)
- Plain text fallback
- Outlook-specific format (.htm file)

#### **Acceptance Criteria**
```
✅ Signature exports as clean HTML (IMPLEMENTED)
✅ HTML works in Gmail, Outlook, Apple Mail (IMPLEMENTED - basic compatibility)
🚧 Installation guides are clear and accurate (IN PROGRESS - quick instructions implemented)
⏳ User can download .htm file for Outlook (PENDING)
✅ Fallback text is generated automatically (IMPLEMENTED)
```

**Implementation Status**: 🚧 **IN PROGRESS** - Basic export functionality complete, working on comprehensive installation guides and .htm download.

---

## 3. **Technical Requirements**

### 3.1 **Frontend Architecture**

#### **Tech Stack**
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + ShadCN UI
- **State Management**: React Context + useState
- **Form Handling**: React Hook Form + Zod validation
- **Image Processing**: Client-side canvas manipulation

#### **Key Components**
```typescript
// Component Structure
components/
├── auth/
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── ResetPasswordForm.tsx
├── signature/
│   ├── SignatureBuilder.tsx
│   ├── SignaturePreview.tsx
│   ├── TemplateSelector.tsx
│   ├── LogoUpload.tsx
│   └── FormFields.tsx
├── export/
│   ├── ExportPanel.tsx
│   └── InstallationGuide.tsx
└── ui/
    ├── Button.tsx
    ├── Input.tsx
    ├── Select.tsx
    └── Toast.tsx
```

#### **Pages Structure**
```
app/
├── (auth)/
│   ├── login/page.tsx
│   ├── register/page.tsx
│   └── reset-password/page.tsx
├── dashboard/
│   └── page.tsx
├── builder/
│   └── page.tsx
├── export/
│   └── page.tsx
└── page.tsx (landing)
```

### 3.2 **Backend Architecture**

#### **Database Schema (NeonDB PostgreSQL)**
```sql
-- Users table (Better Auth compatible)
CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    email_verified BOOLEAN DEFAULT FALSE NOT NULL,
    image TEXT,
    created_at TIMESTAMP DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Sessions table (Better Auth)
CREATE TABLE sessions (
    id TEXT PRIMARY KEY,
    expires_at TIMESTAMP NOT NULL,
    token TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- Accounts table (Better Auth)
CREATE TABLE accounts (
    id TEXT PRIMARY KEY,
    account_id TEXT NOT NULL,
    provider_id TEXT NOT NULL,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    access_token TEXT,
    refresh_token TEXT,
    id_token TEXT,
    access_token_expires_at TIMESTAMP,
    refresh_token_expires_at TIMESTAMP,
    scope TEXT,
    password TEXT,
    created_at TIMESTAMP NOT NULL,
    updated_at TIMESTAMP NOT NULL
);

-- Verifications table (Better Auth)
CREATE TABLE verifications (
    id TEXT PRIMARY KEY,
    identifier TEXT NOT NULL,
    value TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Signatures table
CREATE TABLE signatures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(100),
    company VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    website VARCHAR(255),
    logo_data TEXT, -- Base64 encoded logo
    template_id VARCHAR(20) DEFAULT 'classic',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_signatures_user_id ON signatures(user_id);
```

#### **API Endpoints**
```typescript
// Authentication
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/reset-password

// Signatures
GET /api/signatures (user's signatures)
POST /api/signatures (create signature)
PUT /api/signatures/:id (update signature)
DELETE /api/signatures/:id (delete signature)

// Export
GET /api/export/:id/html (get HTML export)
GET /api/export/:id/text (get text export)
```

### 3.3 **Authentication Integration**

#### **Better Auth Configuration**
```typescript
// auth.config.ts
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { database } from "./db"

export const auth = betterAuth({
  database: drizzleAdapter(database, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // MVP: Skip verification
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
  },
})
```

### 3.4 **Database Integration (Drizzle ORM)**

#### **Schema Definition**
```typescript
// db/schema.ts
import { pgTable, uuid, varchar, text, boolean, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  emailVerified: boolean('email_verified').default(false),
})

export const signatures = pgTable('signatures', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull(),
  title: varchar('title', { length: 100 }),
  company: varchar('company', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  website: varchar('website', { length: 255 }),
  department: varchar('department', { length: 100 }),
  mobile: varchar('mobile', { length: 50 }),
  address: text('address'),
  logoData: text('logo_data'),
  templateId: varchar('template_id', { length: 20 }).default('classic'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})
```

---

## 4. **Non-Functional Requirements**

### 4.1 **Performance Requirements**
- **Page Load Time**: <3 seconds (measured via Vercel Analytics)
- **Time to First Contentful Paint**: <1.5 seconds
- **Signature Generation**: <500ms
- **Image Processing**: <2 seconds for logo upload
- **Database Queries**: <100ms average response time

### 4.2 **Security Requirements**
- **Authentication**: Secure password hashing (bcrypt)
- **Session Management**: HTTPOnly cookies, secure flags
- **Input Validation**: All user inputs sanitized
- **File Upload Security**: File type validation, size limits
- **SQL Injection Protection**: Parameterized queries via Drizzle ORM
- **XSS Protection**: Input sanitization, Content Security Policy

### 4.3 **Compatibility Requirements**

#### **Browser Support**
- Chrome 90+ (primary)
- Firefox 88+ (primary)
- Safari 14+ (secondary)
- Edge 90+ (secondary)

#### **Email Client Compatibility**
- Gmail (web, mobile)
- Outlook (desktop, web, mobile)
- Apple Mail (macOS, iOS)
- Thunderbird
- Yahoo Mail

#### **Device Support**
- Desktop: 1920x1080 minimum
- Tablet: 768px+ width
- Mobile: 360px+ width (responsive design)

### 4.4 **Scalability Requirements**
- **Concurrent Users**: Support 100+ simultaneous users
- **Database**: Handle 10,000+ signature records
- **Storage**: Efficient base64 logo storage (temporary MVP solution)
- **Caching**: Static asset caching via Vercel CDN

---

## 5. **User Experience Requirements**

### 5.1 **User Interface Standards**
- **Design System**: Consistent use of ShadCN UI components
- **Color Scheme**: Professional blue/gray palette
- **Typography**: Inter font family
- **Spacing**: 8px grid system
- **Accessibility**: WCAG 2.1 AA compliance

### 5.2 **User Flow Requirements**

#### **Primary User Journey**
1. **Landing Page** → Clear value proposition, CTA to register
2. **Registration** → Simple form, email verification optional
3. **Dashboard** → Welcome message, "Create Signature" CTA
4. **Builder** → Form fields, template selection, live preview
5. **Export** → HTML copy, installation guides
6. **Success** → Confirmation, return to dashboard

#### **Error Handling**
- Clear, actionable error messages
- Form validation with inline feedback
- Graceful handling of network failures
- Loading states for all async operations

### 5.3 **Mobile Experience**
- Fully responsive design
- Touch-friendly interface (44px minimum touch targets)
- Mobile-optimized forms
- Swipe navigation for template selection

---

## 6. **Integration Requirements**

### 6.1 **Email Client Integration**
- **Gmail**: Compatible HTML signature format
- **Outlook**: .htm file download option
- **Apple Mail**: RTF format consideration

### 6.2 **Third-Party Services**
- **NeonDB**: PostgreSQL database hosting
- **Vercel**: Frontend hosting and serverless functions
- **Better Auth**: Authentication service
- **No external APIs** for MVP (keep it simple)

---

## 7. **Testing Requirements**

### 7.1 **Unit Testing**
- **Frontend**: Jest + React Testing Library
- **Backend**: Vitest for API endpoints
- **Coverage Target**: >80% for critical paths

### 7.2 **Integration Testing**
- **User Authentication Flow**: Registration → Login → Signature Creation
- **Signature Builder**: Form submission → Preview generation → Export
- **Cross-browser Testing**: Chrome, Firefox, Safari testing

### 7.3 **Email Client Testing**
- **Manual Testing**: Generate signature, test in 5 major email clients
- **HTML Validation**: W3C HTML validator compliance
- **Rendering Tests**: Screenshot comparison across clients

### 7.4 **Performance Testing**
- **Load Testing**: 50+ concurrent users
- **Stress Testing**: Database query performance
- **Mobile Performance**: Lighthouse scores >90

---

## 8. **Deployment Requirements**

### 8.1 **Infrastructure**
- **Frontend**: Vercel hosting with automatic deployments
- **Database**: NeonDB PostgreSQL (serverless tier)
- **Domain**: Custom domain with SSL certificate
- **CDN**: Vercel Edge Network for static assets

### 8.2 **Environment Configuration**
```env
# Production Environment Variables
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://signaturecraft.co.za
NODE_ENV=production
```

### 8.3 **Monitoring**
- **Error Tracking**: Sentry integration
- **Analytics**: Vercel Analytics
- **Performance**: Core Web Vitals monitoring
- **Uptime**: Basic health checks

---

## 9. **Documentation Requirements**

### 9.1 **Technical Documentation**
- **API Documentation**: OpenAPI/Swagger specs
- **Database Schema**: ERD diagrams
- **Component Documentation**: Storybook (optional)
- **Deployment Guide**: Step-by-step setup instructions

### 9.2 **User Documentation**
- **Installation Guides**: Email client-specific instructions
- **FAQ**: Common questions and troubleshooting
- **Video Tutorials**: Screen recordings for key workflows
- **Help Center**: Basic support documentation

---

## 10. **Success Metrics & Analytics**

### 10.1 **Technical Metrics**
- **Uptime**: >99.5%
- **Performance**: <3s page load times
- **Error Rate**: <1% of requests
- **User Satisfaction**: >4.0/5.0 rating

### 10.2 **Business Metrics**
- **User Registration**: Track signup completion rate
- **Signature Creation**: Track successful signature exports
- **User Retention**: Track 7-day and 30-day retention
- **Conversion Funnel**: Landing page → Registration → First signature

### 10.3 **Usage Analytics**
```typescript
// Key Events to Track
- User Registration
- First Signature Created  
- Signature Exported
- Template Selection
- Logo Upload
- User Return (7-day)
```

---

## 11. **Risk Mitigation**

### 11.1 **Technical Risks**
| Risk | Mitigation Strategy |
|------|-------------------|
| Email client compatibility issues | Extensive testing with HTML email validators |
| Database performance | Use indexed queries, monitor query performance |
| Image upload failures | Implement robust error handling and file validation |
| Authentication vulnerabilities | Use proven Better Auth library, security audit |

### 11.2 **Business Risks**
| Risk | Mitigation Strategy |
|------|-------------------|
| Low user adoption | Strong landing page validation before development |
| Competitor launch | Focus on superior UX and local market knowledge |
| Technical complexity | Start simple, validate before adding features |

---

## 12. **Launch Checklist**

### 12.1 **Pre-Launch Requirements**
- [ ] All user acceptance criteria met
- [ ] Cross-browser testing completed
- [ ] Email client compatibility verified
- [ ] Security audit passed
- [ ] Performance benchmarks met
- [ ] Error monitoring configured
- [ ] Backup and recovery procedures tested
- [ ] Legal compliance reviewed (POPIA)

### 12.2 **Launch Day Requirements**
- [ ] Production deployment successful
- [ ] DNS configuration correct
- [ ] SSL certificate active
- [ ] Monitoring dashboards operational
- [ ] Support documentation published
- [ ] Beta user feedback collected
- [ ] Marketing materials ready

---

**This requirements document provides comprehensive technical specifications for building and launching the SignatureCraft MVP successfully within 6 weeks.**