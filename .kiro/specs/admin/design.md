# Admin System Design Document

## Overview

The admin system extends SignatureCraft MVP with comprehensive administrative capabilities, providing authorized users with tools to manage the platform, monitor user activity, and maintain system health. The design follows the existing Next.js 15 App Router architecture with Better Auth integration, ensuring seamless integration with the current system while maintaining security and performance standards.

## Architecture

### System Integration
The admin system integrates with the existing SignatureCraft architecture:
- **Authentication**: Extends Better Auth with role-based access control
- **Database**: Adds admin-specific tables to existing Drizzle schema
- **API Layer**: New admin-specific API routes with enhanced security
- **UI Components**: Reuses existing ShadCN UI components with admin-specific extensions
- **Middleware**: Enhanced route protection for admin-only areas

### Security Model
- **Role-Based Access Control (RBAC)**: Users have roles (user, admin, super_admin)
- **Route Protection**: Middleware validates admin role before granting access
- **Session Management**: Leverages existing Better Auth session handling
- **Audit Logging**: All admin actions are logged with timestamps and user identification
- **Data Isolation**: Admin functions operate with elevated permissions but maintain data integrity

## Components and Interfaces

### Database Schema Extensions

```typescript
// Additional fields for users table
export const users = pgTable("users", {
  // ... existing fields
  role: varchar("role", { length: 20 }).default("user").notNull(), // "user" | "admin" | "super_admin"
  isActive: boolean("is_active").default(true).notNull(),
  lastLoginAt: timestamp("last_login_at"),
  loginAttempts: integer("login_attempts").default(0).notNull(),
  lockedUntil: timestamp("locked_until"),
});

// New admin audit log table
export const adminLogs = pgTable("admin_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  adminId: text("admin_id").notNull().references(() => users.id),
  action: varchar("action", { length: 100 }).notNull(),
  targetType: varchar("target_type", { length: 50 }), // "user" | "signature" | "system"
  targetId: text("target_id"),
  details: json("details"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow(),
});

// System settings table
export const systemSettings = pgTable("system_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value").notNull(),
  description: text("description"),
  updatedBy: text("updated_by").references(() => users.id),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User notifications table
export const notifications = pgTable("notifications", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id").references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 200 }).notNull(),
  message: text("message").notNull(),
  type: varchar("type", { length: 50 }).default("info"), // "info" | "warning" | "error" | "success"
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
```

### Admin Layout Structure

```
src/app/admin/
├── layout.tsx              # Admin-specific layout with navigation
├── page.tsx               # Dashboard overview
├── users/
│   ├── page.tsx          # User management list
│   ├── [id]/
│   │   ├── page.tsx      # User details and actions
│   │   └── signatures/page.tsx # User's signatures
├── signatures/
│   ├── page.tsx          # All signatures overview
│   └── [id]/page.tsx     # Signature preview and actions
├── analytics/
│   └── page.tsx          # Usage analytics and reports
├── security/
│   └── page.tsx          # Security logs and monitoring
├── settings/
│   └── page.tsx          # System configuration
├── communications/
│   └── page.tsx          # User notifications and messaging
└── admins/
    └── page.tsx          # Admin user management
```

### Core Components

#### AdminGuard Component
```typescript
// src/components/admin/AdminGuard.tsx
interface AdminGuardProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "super_admin";
}

export function AdminGuard({ children, requiredRole = "admin" }: AdminGuardProps) {
  // Validates user role and renders children or redirect
}
```

#### AdminNavigation Component
```typescript
// src/components/admin/AdminNavigation.tsx
export function AdminNavigation() {
  // Sidebar navigation with role-based menu items
  // Dashboard, Users, Signatures, Analytics, Security, Settings
}
```

#### DataTable Component
```typescript
// src/components/admin/DataTable.tsx
interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchable?: boolean;
  filterable?: boolean;
  pagination?: boolean;
}

export function DataTable<T>({ data, columns, ...options }: DataTableProps<T>) {
  // Reusable table component for users, signatures, logs
}
```

### API Architecture

#### Admin API Routes Structure
```
src/app/api/admin/
├── dashboard/
│   └── route.ts          # GET dashboard metrics
├── users/
│   ├── route.ts          # GET users list, POST create user
│   └── [id]/
│       ├── route.ts      # GET/PUT/DELETE user
│       ├── activate/route.ts # POST activate/deactivate
│       ├── signatures/route.ts # GET user signatures
│       └── reset-password/route.ts # POST reset password
├── signatures/
│   ├── route.ts          # GET all signatures
│   └── [id]/
│       ├── route.ts      # GET/DELETE signature
│       └── flag/route.ts # POST flag inappropriate content
├── analytics/
│   ├── users/route.ts    # GET user analytics
│   ├── signatures/route.ts # GET signature analytics
│   └── export/route.ts   # GET analytics export
├── security/
│   ├── logs/route.ts     # GET security logs
│   └── alerts/route.ts   # GET security alerts
├── settings/
│   └── route.ts          # GET/PUT system settings
├── communications/
│   ├── notifications/route.ts # GET/POST notifications
│   └── broadcast/route.ts     # POST broadcast messages
└── admins/
    └── route.ts          # GET/POST admin users
```

#### API Security Middleware
```typescript
// src/lib/admin-auth.ts
export async function validateAdminAccess(
  request: NextRequest,
  requiredRole: "admin" | "super_admin" = "admin"
): Promise<{ user: User; session: Session } | NextResponse> {
  // Validates session and admin role
  // Returns user/session or redirect response
}
```

## Data Models

### User Management Models
```typescript
interface AdminUser extends User {
  role: "user" | "admin" | "super_admin";
  isActive: boolean;
  lastLoginAt?: Date;
  loginAttempts: number;
  lockedUntil?: Date;
  signatureCount: number;
  createdSignatures?: Signature[];
}

interface UserAction {
  type: "activate" | "deactivate" | "delete" | "reset_password" | "promote" | "demote";
  reason?: string;
  performedBy: string;
  performedAt: Date;
}
```

### Analytics Models
```typescript
interface DashboardMetrics {
  totalUsers: number;
  activeUsers: number;
  totalSignatures: number;
  recentRegistrations: number;
  systemHealth: "healthy" | "warning" | "critical";
  alerts: SystemAlert[];
}

interface UserAnalytics {
  registrationTrends: TimeSeriesData[];
  userActivity: ActivityData[];
  retentionRates: RetentionData[];
  geographicDistribution: LocationData[];
}

interface SignatureAnalytics {
  creationTrends: TimeSeriesData[];
  templatePopularity: TemplateUsageData[];
  exportMethodUsage: ExportData[];
  averageCreationTime: number;
}
```

### Security Models
```typescript
interface SecurityLog {
  id: string;
  timestamp: Date;
  level: "info" | "warning" | "error" | "critical";
  event: string;
  userId?: string;
  ipAddress: string;
  userAgent: string;
  details: Record<string, any>;
}

interface SecurityAlert {
  id: string;
  type: "failed_login" | "suspicious_activity" | "data_breach" | "system_error";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  affectedUsers: string[];
  status: "active" | "investigating" | "resolved";
  createdAt: Date;
  resolvedAt?: Date;
}
```

## Error Handling

### Admin-Specific Error Types
```typescript
class AdminAuthError extends Error {
  constructor(message: string, public code: "INSUFFICIENT_PERMISSIONS" | "INVALID_ROLE") {
    super(message);
  }
}

class AdminActionError extends Error {
  constructor(message: string, public code: "ACTION_FAILED" | "VALIDATION_ERROR") {
    super(message);
  }
}
```

### Error Handling Strategy
- **Authentication Errors**: Redirect to login with appropriate message
- **Authorization Errors**: Show access denied page with role requirements
- **Validation Errors**: Display inline form errors with correction guidance
- **System Errors**: Log error details and show generic user-friendly message
- **Audit Trail**: All errors in admin context are logged for security monitoring

### Error Recovery
- **Session Expiry**: Automatic redirect to login with return URL
- **Network Errors**: Retry mechanism with exponential backoff
- **Data Conflicts**: Optimistic locking with conflict resolution UI
- **Bulk Operations**: Partial success handling with detailed results

## Testing Strategy

### Unit Testing
- **Authentication Logic**: Role validation, session handling
- **Data Access Layer**: Database queries, data transformations
- **Business Logic**: User management, signature operations
- **Utility Functions**: Validation, formatting, calculations

### Integration Testing
- **API Endpoints**: Request/response validation, error handling
- **Database Operations**: CRUD operations, transaction handling
- **Authentication Flow**: Login, role checking, session management
- **Middleware**: Route protection, request validation

### End-to-End Testing
- **Admin Workflows**: Complete user management scenarios
- **Security Testing**: Access control, privilege escalation prevention
- **Performance Testing**: Large dataset handling, concurrent operations
- **Browser Testing**: Cross-browser compatibility for admin interface

### Security Testing
- **Access Control**: Role-based permission validation
- **Input Validation**: SQL injection, XSS prevention
- **Session Security**: Session hijacking, CSRF protection
- **Audit Logging**: Comprehensive action tracking

## Performance Considerations

### Database Optimization
- **Indexing Strategy**: Indexes on frequently queried fields (user.role, user.isActive, adminLogs.createdAt)
- **Query Optimization**: Efficient joins, pagination for large datasets
- **Connection Pooling**: Reuse existing NeonDB connection pool
- **Caching Strategy**: Redis cache for frequently accessed admin data

### Frontend Performance
- **Code Splitting**: Lazy load admin components
- **Data Fetching**: Server-side rendering for initial load, client-side for interactions
- **Virtual Scrolling**: Handle large user/signature lists efficiently
- **Debounced Search**: Optimize search input handling

### Scalability Considerations
- **Pagination**: Implement cursor-based pagination for large datasets
- **Background Jobs**: Queue system for bulk operations
- **Rate Limiting**: Protect admin APIs from abuse
- **Monitoring**: Performance metrics and alerting

## Security Implementation

### Authentication & Authorization
```typescript
// Enhanced middleware for admin routes
export async function adminMiddleware(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  
  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  const user = await getUserWithRole(session.user.id);
  
  if (!user || !["admin", "super_admin"].includes(user.role)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
  
  // Log admin access
  await logAdminAction({
    adminId: user.id,
    action: "page_access",
    details: { path: request.nextUrl.pathname },
    ipAddress: request.ip,
    userAgent: request.headers.get("user-agent"),
  });
  
  return NextResponse.next();
}
```

### Audit Logging
- **Action Tracking**: All admin actions logged with context
- **Data Changes**: Before/after values for modifications
- **Access Logging**: Page visits, API calls, search queries
- **Security Events**: Failed access attempts, privilege changes

### Data Protection
- **Input Sanitization**: All user inputs validated and sanitized
- **Output Encoding**: Prevent XSS in admin interface
- **SQL Injection Prevention**: Parameterized queries via Drizzle ORM
- **CSRF Protection**: Token validation for state-changing operations

## Deployment Considerations

### Environment Configuration
```typescript
// Additional environment variables
ADMIN_SESSION_TIMEOUT=3600000 // 1 hour for admin sessions
ADMIN_MAX_LOGIN_ATTEMPTS=3
ADMIN_LOCKOUT_DURATION=900000 // 15 minutes
AUDIT_LOG_RETENTION_DAYS=365
SECURITY_ALERT_EMAIL=admin@signaturecraft.co.za
```

### Database Migrations
- **Schema Updates**: Add role, isActive fields to users table
- **New Tables**: adminLogs, systemSettings, notifications
- **Indexes**: Performance optimization for admin queries
- **Data Migration**: Set existing users to "user" role

### Monitoring & Alerting
- **Admin Activity Monitoring**: Unusual admin behavior detection
- **System Health Checks**: Database connectivity, API response times
- **Security Alerts**: Failed login attempts, suspicious activities
- **Performance Metrics**: Admin page load times, query performance