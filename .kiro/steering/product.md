---
inclusion: always
---

# SignatureCraft MVP Product Guidelines

## Core Value Proposition
**"Professional email signatures in 3 clicks - no design skills required"**

Target: South African professionals and SMBs who need branded email signatures quickly and easily.

## Primary User Journey (Must Follow)
1. **Sign up** → 2 minutes (email/password only)
2. **Build signature** → 3 minutes (simple form + template)
3. **Copy to email** → 30 seconds (direct paste into Gmail/Outlook)
4. **Done** ✅

## MVP Feature Scope (Strict Limits)

### ✅ INCLUDED (Must Have) - COMPLETED
- Single-user authentication (email/password) ✅
- Simple signature builder (form-based with mobile-optimized tabbed interface) ✅
- 3 professional templates (Classic, Modern, Minimal) with visual previews ✅
- Contact info fields (name, title, company, email, phone, website) with validation ✅
- Logo upload (PNG/JPG/SVG, 2MB max, auto-resize to 150px) with drag-and-drop ✅
- HTML export with copy-paste for Gmail, Outlook, and general HTML ✅
- Quick setup instructions integrated in preview ✅
- Responsive design (mobile/tablet/desktop) with touch-friendly interface ✅
- Brand color customization (primary and secondary colors) ✅
- Real-time signature preview with desktop/mobile modes ✅

### ❌ EXCLUDED (Future Phases)
- Team management or multi-user features
- Payment processing (validation phase only)
- Advanced analytics or tracking
- Multiple signatures per user
- Social media links or banners
- Drag-and-drop interface
- Advanced customization options
- Mobile applications
- API access

## Success Metrics (MVP Goals)
- **User Acquisition**: 200+ registered users in 3 months
- **Activation Rate**: 70% create their first signature
- **Completion Rate**: 80% successfully export signature
- **User Satisfaction**: >4.0/5.0 average rating
- **Performance**: <3 second page load times
- **Retention**: 40% return within 7 days

## Template Requirements
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

## Template System Architecture
- **Component-Based**: Each template is a React component with consistent props interface
- **Metadata-Driven**: Templates include metadata for name, description, and preview
- **Registry System**: Central registry for all templates with automatic registration
- **Type Safety**: Full TypeScript support with interfaces and type checking
- **Preview Environment**: Development environment for testing templates with sample data
- **Error Handling**: Graceful fallbacks for template rendering failures

## Copy-Paste Export Requirements
- **Gmail**: HTML format that pastes directly into Gmail signature settings
- **Outlook**: Rich text format for Outlook signature editor (web/desktop)
- **Apple Mail**: Optimized format for Apple Mail with proper formatting
- **Fallback**: .htm file download for unsupported clients
- **Error Handling**: Graceful fallbacks for clipboard operation failures
- **User Feedback**: Clear success/error messages for all export operations

## User Experience Principles
- **Simplicity First**: Every feature must pass the "3-click test"
- **No Learning Curve**: Intuitive without tutorials or documentation
- **Mobile-Friendly**: Works perfectly on phones and tablets
- **Error Prevention**: Clear validation and helpful error messages
- **Speed**: Fast loading, instant preview updates

## Business Model (Validation Phase)
- **Free Tier**: 1 signature, basic templates, SignatureCraft branding
- **Future Pro**: R99/month for unlimited signatures and premium features
- **Focus**: Prove product-market fit before monetization

## Market Focus
- **Primary**: South African professionals and SMBs
- **Language**: English (South African context)
- **Currency**: ZAR (South African Rand) for future pricing
- **Compliance**: POPIA (Protection of Personal Information Act) requirements

## Quality Standards
- **Email Compatibility**: Must work in Gmail, Outlook, Apple Mail
- **Browser Support**: Chrome, Firefox, Safari, Edge (latest versions)
- **Performance**: <3s load times, <500ms signature generation
- **Accessibility**: WCAG 2.1 AA compliance
- **Security**: Secure authentication, input validation, XSS protection