# 📘 EcoRide Platform - Technical Documentation

**Version**: 1.0.0  
**Date**: February 2026  
**Project**: Carpooling Platform  
**Formation**: DWWM (Développeur Web et Web Mobile)

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Project Overview](#project-overview)
3. [Technology Stack](#technology-stack)
4. [Architecture](#architecture)
5. [Development Methodology](#development-methodology)
6. [Security Implementation](#security-implementation)
7. [API Documentation](#api-documentation)
8. [Database Design](#database-design)
9. [Deployment Strategy](#deployment-strategy)
10. [Testing Strategy](#testing-strategy)
11. [Appendices](#appendices)

---

## Executive Summary

### Project Goal
EcoRide is a modern carpooling platform designed to promote ecological transportation by connecting drivers and passengers. The platform features a credit-based economy, comprehensive trip management, review system with moderation, and administrative tools.

### Key Features
- **User Management**: Multi-role authentication (Passenger, Driver, Employee, Admin)
- **Trip Management**: Complete lifecycle from creation to completion
- **Credit System**: Virtual currency with atomic transactions
- **Review Moderation**: Employee validation before publication
- **Admin Dashboard**: Analytics and user management
- **Email Notifications**: Transactional emails for all major events
- **Audit Logging**: MongoDB-based comprehensive logging

### Project Metrics
- **Total Files**: 60+
- **Lines of Code**: 6,000+
- **API Endpoints**: 35+
- **User Stories**: 13 (all implemented)
- **Development Time**: ~70 hours estimated
- **Team Size**: 1 developer (full-stack)

---

## Project Overview

### Context
The project is a final evaluation for the DWWM certification program (Titre professionnel Développeur web et web mobile). It demonstrates both front-end (Activité Type 1) and back-end (Activité Type 2) competencies.

### Objectives
1. **Functional**: Implement all 13 User Stories covering visitor, passenger, driver, employee, and admin roles
2. **Technical**: Demonstrate modern web development practices with TypeScript, Next.js, and dual database architecture
3. **Professional**: Follow GitFlow methodology, conventional commits, and comprehensive documentation
4. **Pedagogical**: Show mastery of full-stack development from UI/UX to database design to deployment

### Stakeholders
- **Passengers**: Users seeking eco-friendly transportation
- **Drivers**: Users offering carpool services for credits
- **Employees**: Moderators managing review quality
- **Administrators**: Platform managers with full access
- **Visitors**: Unauthenticated users browsing the platform

---

## Technology Stack

### Frontend Technologies

#### React 19.2.3
**Choice Justification**:
- Latest stable version with improved performance
- Excellent ecosystem and community support
- Component-based architecture promotes reusability
- Virtual DOM for efficient updates
- Hooks API for clean state management

**Usage**:
- Context API for global state (authentication)
- Controlled components for all forms
- Custom hooks for API integration (`useAuth`, `useCarpool`)

#### Next.js 16.1.6
**Choice Justification**:
- **Server-Side Rendering (SSR)**: Better SEO for public carpool listings
- **App Router**: Modern routing with layouts and loading states
- **API Routes**: Unified codebase for frontend and backend
- **Turbopack**: Fast refresh during development
- **Image Optimization**: Built-in Next.js Image component
- **Production Performance**: Automatic code splitting and bundling

**Usage**:
- API routes for all backend endpoints (`/app/api/*`)
- Dynamic routes for carpool details (`/carpools/[id]`)
- Layouts for consistent UI structure
- Loading and error boundaries for UX

#### TypeScript 5.x (Strict Mode)
**Choice Justification**:
- **Type Safety**: Catch errors at compile-time, not runtime
- **IntelliSense**: Improved developer experience with autocomplete
- **Refactoring**: Safe code transformations with type checking
- **Documentation**: Types serve as inline documentation
- **Maintainability**: Easier to maintain large codebase

**Configuration**:
```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "noImplicitAny": true,
  "strictNullChecks": true
}
```

#### Tailwind CSS v4
**Choice Justification**:
- **Utility-First**: Rapid UI development without context switching
- **Responsive Design**: Mobile-first breakpoints built-in
- **Customization**: Easy theming with CSS variables
- **Performance**: Purges unused styles in production
- **Consistency**: Prevents CSS duplication and conflicts

**Custom Theme**:
- Ecological color palette (greens, blues)
- Custom gradient for premium features
- Consistent spacing scale (4px base)

#### shadcn/ui + Radix UI
**Choice Justification**:
- **Accessibility**: WCAG 2.1 AA compliant components
- **Unstyled Primitives**: Complete design control
- **TypeScript Support**: Fully typed components
- **No Runtime Cost**: Components copied to project
- **Keyboard Navigation**: Full keyboard accessibility

**Components Used**:
- Button, Card, Input, Label, Checkbox
- Dialog (for confirmations)
- Slider (for price filter)
- Avatar (for user profiles)

---

### Backend Technologies

#### Next.js API Routes
**Choice Justification**:
- **Unified Codebase**: Frontend and backend in same repository
- **TypeScript Support**: End-to-end type safety
- **Serverless Ready**: Easy deployment to Vercel/AWS
- **Middleware Support**: Custom authentication and validation
- **File-Based Routing**: Organized by feature

**Structure**:
```
/app/api/
├── auth/
│   ├── register/route.ts
│   └── login/route.ts
├── carpools/
│   ├── route.ts
│   ├── search/route.ts
│   └── [id]/
│       ├── route.ts
│       ├── start/route.ts
│       ├── complete/route.ts
│       └── cancel/route.ts
├── bookings/route.ts
├── reviews/route.ts
├── admin/
│   ├── analytics/route.ts
│   ├── employees/route.ts
│   └── users/[id]/suspend/route.ts
└── notifications/route.ts
```

#### Prisma ORM 7.3.0
**Choice Justification**:
- **Type-Safe Queries**: Generated TypeScript types from schema
- **Migration System**: Version-controlled database changes
- **Transaction Support**: ACID transactions for credit operations
- **Relation Queries**: Efficient JOIN operations with `include`
- **Raw SQL Support**: Fallback for complex queries (analytics)

**Key Features Used**:
```typescript
// Type-safe queries
const user = await prisma.user.findUnique({ 
  where: { id: userId },
  include: { vehicles: true, preferences: true }
});

// Atomic transactions
await prisma.$transaction(async (tx) => {
  await tx.user.update({ ... });
  await tx.booking.create({ ... });
  await tx.carpool.update({ ... });
});

// Raw SQL for analytics
const stats = await prisma.$queryRaw`
  SELECT DATE(created_at), COUNT(*)
  FROM carpools
  WHERE created_at > NOW() - INTERVAL '30 days'
  GROUP BY DATE(created_at)
`;
```

#### PostgreSQL 16.x
**Choice Justification**:
- **ACID Compliance**: Critical for financial transactions (credits)
- **Relational Integrity**: Foreign keys enforce data consistency
- **Complex Queries**: JOINs for carpool search with driver/vehicle data
- **Performance**: Excellent indexing and query optimization
- **Maturity**: Battle-tested, industry standard
- **JSON Support**: Flexible metadata storage when needed

**Usage**:
- Primary database for all business data
- 6 tables: users, vehicles, carpools, bookings, reviews, preferences
- Enforced constraints (UNIQUE, NOT NULL, CHECK)
- Cascading deletes for referential integrity

#### MongoDB 6.x
**Choice Justification**:
- **Schema Flexibility**: Evolving log/notification structures
- **Write Performance**: High-volume logging without affecting PostgreSQL
- **Time-Series Data**: Optimized for timestamped events
- **Aggregation Pipeline**: Powerful analytics on logs
- **Horizontal Scaling**: Easy to scale as logs grow

**Usage**:
- Audit logging (all user actions)
- In-app notifications
- Analytics data (optional)
- Retention policy: 90 days for logs, 30 days for notifications

---

### Authentication & Security

#### JWT (JSON Web Tokens)
**Choice Justification**:
- **Stateless**: No server-side session storage needed
- **Scalable**: Works across multiple servers/instances
- **Portable**: Token passed in Authorization header
- **Secure**: HMAC SHA256 signature prevents tampering

**Implementation**:
```typescript
// Token payload
interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;  // Issued at
  exp: number;  // Expires (7 days)
}

// Secret from environment variable
const JWT_SECRET = process.env.JWT_SECRET;

// 7-day expiration
const expiresIn = '7d';
```

#### bcrypt (Password Hashing)
**Choice Justification**:
- **Industry Standard**: Widely trusted and audited
- **Salt Built-In**: Automatic unique salt per password
- **Adaptive**: Adjustable cost factor (10 rounds = ~100ms)
- **One-Way**: Impossible to reverse hash to password

**Implementation**:
```typescript
// Hash password on registration
const hashedPassword = await bcrypt.hash(password, 10);

// Verify on login
const isValid = await bcrypt.compare(inputPassword, user.password);
```

#### Nodemailer (Email Service)
**Choice Justification**:
- **SMTP Support**: Works with any email provider
- **Template Support**: HTML email templates
- **Attachments**: Can send PDFs/images if needed
- **Async**: Non-blocking email sending

**Integration**:
- Gmail SMTP (recommended for development)
- HTML templates with EcoRide branding
- 4 email types: booking confirmation, trip started, trip completed, trip cancelled
- Non-blocking: Email failures don't break main flow

---

### Development Tools

#### Git & GitHub
**Methodology**: GitFlow
- `main` branch: Production-ready code
- `develop` branch: Integration branch
- `feature/*` branches: Individual features (US1-US13)
- Conventional commits: `feat:`, `fix:`, `docs:`, `refactor:`

**Commit Guidelines**:
```
feat(US3): implement carpool search with filters
fix(auth): prevent suspended users from logging in
docs: update README with deployment instructions
refactor(api): extract common validation logic
test(bookings): add unit tests for credit validation
```

#### ESLint & TypeScript Compiler
- **Linting**: Enforces code style consistency
- **Type Checking**: Pre-commit validation
- **Auto-Fix**: VSCode integration for quick fixes

#### Environment Variables
**Configuration**:
```env
# Database
DATABASE_URL=postgresql://user:pass@host:5432/ecoride
MONGODB_URI=mongodb://user:pass@host:27017/ecoride_logs

# JWT
JWT_SECRET=your-super-secret-key-min-32-chars

# Email (Gmail App Password recommended)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# App URL (for email links)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Architecture

### System Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    CLIENT BROWSER                        │
│                  (React Application)                     │
└─────────────────────┬────────────────────────────────────┘
                      │ HTTPS
                      │
┌─────────────────────▼────────────────────────────────────┐
│                 NEXT.JS SERVER                           │
│  ┌────────────────────────────────────────────────────┐  │
│  │           SERVER SIDE RENDERING (SSR)             │  │
│  │    - Initial page load from server                │  │
│  │    - SEO-friendly HTML generation                 │  │
│  └────────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │              API ROUTES LAYER                      │  │
│  │  ┌──────────────┐  ┌──────────────┐                │  │
│  │  │ Middleware   │  │ Controllers  │                │  │
│  │  │ - Auth       │  │ - Business   │                │  │
│  │  │ - Validation │  │   Logic      │                │  │
│  │  └──────────────┘  └──────────────┘                │  │
│  └────────────────────────────────────────────────────┘  │
└─────────────┬───────────────────────┬────────────────────┘
              │                       │
              │ Prisma ORM            │ MongoDB Driver
              │                       │
┌─────────────▼──────────┐   ┌────────▼──────────┐
│     PostgreSQL         │   │     MongoDB       │
│   (Business Data)      │   │   (Logs/Notifs)   │
│                        │   │                   │
│ • users                │   │ • logs            │
│ • carpools             │   │ • notifications   │
│ • bookings             │   │                   │
│ • vehicles             │   │                   │
│ • reviews              │   │                   │
│ • preferences          │   │                   │
└────────────────────────┘   └───────────────────┘
```

### Application Layers

#### 1. Presentation Layer (Frontend)
**Responsibilities**:
- Render UI components
- Handle user interactions
- Client-side validation
- State management (Context API)
- Routing and navigation

**Technologies**: React, Next.js, Tailwind CSS, shadcn/ui

**Key Components**:
- `Header`: Navigation with auth state
- `CarpoolCard`: Trip listing item
- `FilterPanel`: Search filters
- `SearchBar`: Route and date search
- `BookingModal`: Confirmation dialog

#### 2. API Layer (Backend)
**Responsibilities**:
- HTTP request handling
- JWT verification
- Role-based access control
- Input validation and sanitization
- Business logic execution
- Error handling and logging

**Technologies**: Next.js API Routes, TypeScript

**Utilities**:
- `verifyAuth()`: JWT validation middleware
- `apiSuccess()`: Standardized success responses
- `apiError()`: Standardized error responses
- `validatePasswordStrength()`: Password policy enforcement

#### 3. Data Access Layer
**Responsibilities**:
- Database queries and mutations
- Transaction management
- Data mapping (DB ↔ API models)
- Connection pooling

**Technologies**: Prisma ORM, MongoDB Driver

**Services**:
- `prisma.user.*`: User CRUD operations
- `prisma.carpool.*`: Trip management
- `prisma.booking.*`: Reservation handling
- `createLog()`: MongoDB logging
- `createNotification()`: User notifications

#### 4. Data Layer
**Responsibilities**:
- Data persistence
- Referential integrity
- Query optimization (indexes)
- Backup and recovery

**Technologies**: PostgreSQL, MongoDB

---

### Design Patterns

#### 1. Repository Pattern (Implicit via Prisma)
**Purpose**: Abstraction over data access
```typescript
// Prisma acts as repository
const userRepository = prisma.user;
await userRepository.create({ data: { ... } });
await userRepository.findMany({ where: { ... } });
```

#### 2. Middleware Pattern
**Purpose**: Request preprocessing (auth, validation)
```typescript
export async function withAuth(req: NextRequest) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) throw new Error('Unauthorized');
  const user = verifyToken(token);
  return user;
}
```

#### 3. Factory Pattern
**Purpose**: Consistent object creation
```typescript
export function apiSuccess(data: any, message?: string) {
  return NextResponse.json({ 
    success: true, 
    data, 
    message 
  });
}
```

#### 4. Observer Pattern (Implicit)
**Purpose**: Event-driven architecture
```typescript
// Create booking -> trigger email -> trigger notification
await createBooking(data);
await sendBookingEmail(data); // Non-blocking
await createNotification(data); // Non-blocking
```

---

## Development Methodology

### GitFlow Workflow

#### Branch Strategy
```
main (production)
  └── develop (integration)
       ├── feature/US1-homepage
       ├── feature/US2-navigation
       ├── feature/US3-carpool-list
       ├── feature/US4-filters
       ├── feature/US5-carpool-detail
       ├── feature/US6-booking
       ├── feature/US7-auth
       ├── feature/US8-profile
       ├── feature/US9-create-carpool
       ├── feature/US10-trip-history
       ├── feature/US11-trip-control
       ├── feature/US12-employee-space
       └── feature/US13-admin-space
```

#### Workflow Steps
1. **Create Feature Branch**: `git checkout -b feature/US3-carpool-list develop`
2. **Develop Feature**: Implement User Story with regular commits
3. **Test Locally**: Verify functionality works correctly
4. **Commit**: `git commit -m "feat(US3): implement carpool search"`
5. **Merge to Develop**: `git checkout develop && git merge feature/US3-carpool-list`
6. **Deploy Develop**: Staging environment testing
7. **Merge to Main**: `git checkout main && git merge develop`
8. **Tag Release**: `git tag -a v1.0.0 -m "Release 1.0.0"`

### Agile Methodology

#### Sprint Planning
- **Sprint 1 (Week 1)**: Setup + US1, US2, US7 (Infrastructure)
- **Sprint 2 (Week 2)**: US3, US4, US5, US6 (Core passenger features)
- **Sprint 3 (Week 3)**: US8, US9, US10, US11 (Driver features)
- **Sprint 4 (Week 4)**: US12, US13 (Employee/Admin features)
- **Sprint 5 (Week 5)**: Testing, documentation, deployment

#### User Story Format
```
AS A [role]
I WANT TO [action]
SO THAT [benefit]

ACCEPTANCE CRITERIA:
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
```

**Example (US3)**:
```
AS A visitor/passenger
I WANT TO search for available carpools
SO THAT I can find trips matching my needs

ACCEPTANCE CRITERIA:
- [ ] Search form with departure, destination, date
- [ ] Results displayed as cards with key info
- [ ] Empty state shows alternative dates
- [ ] Eco-friendly vehicles have badge
```

---

## Security Implementation

### Authentication Security

#### Password Policy
**Requirements**:
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 number
- At least 1 special character (!@#$%^&*)

**Validation**:
```typescript
export function validatePasswordStrength(password: string): boolean {
  const minLength = password.length >= 8;
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return minLength && hasUpper && hasNumber && hasSpecial;
}
```

#### JWT Security
- **Secret**: 32+ character random string (environment variable)
- **Expiration**: 7 days (configurable)
- **Storage**: HttpOnly cookies (recommended) or localStorage
- **Verification**: HMAC SHA256 signature validation

#### Session Management
- **Suspended Users**: Blocked at login even with valid credentials
- **Token Refresh**: Manual re-login required after expiry
- **Logout**: Client-side token deletion

### Input Validation & Sanitization

#### Server-Side Validation
**All API endpoints validate**:
- Required fields present
- Data types correct
- String lengths within bounds
- Email format valid
- Date values logical (future dates for trips)
- Numeric ranges (seats, credits, rating)

**Example**:
```typescript
// Validate carpool creation
if (!departure || !destination || !departureDate) {
  return apiError('Missing required fields', 400);
}

if (new Date(departureDate) < new Date()) {
  return apiError('Departure date must be in the future', 400);
}

if (availableSeats < 1 || availableSeats > 8) {
  return apiError('Seats must be between 1 and 8', 400);
}
```

#### SQL Injection Prevention
- **Prisma ORM**: All queries parameterized automatically
- **Raw Queries**: Use parameterized inputs `$queryRaw\`...${param}\``
- **Never**: Concatenate user input into SQL strings

### Authorization & Access Control

#### Role-Based Access Control (RBAC)
```typescript
enum UserRole {
  PASSENGER,  // Can book trips, leave reviews
  DRIVER,     // + can create carpools, manage vehicles
  EMPLOYEE,   // + can validate/reject reviews
  ADMIN       // + full platform access
}
```

#### Route Protection
```typescript
// Admin-only endpoints
if (user.role !== 'ADMIN') {
  return apiError('Forbidden: Admin access required', 403);
}

// Driver-only endpoints
if (user.role !== 'DRIVER') {
  return apiError('Forbidden: Driver role required', 403);
}

// Resource ownership
const carpool = await prisma.carpool.findUnique({ where: { id } });
if (carpool.driverId !== user.id) {
  return apiError('Forbidden: Not your carpool', 403);
}
```

### Data Protection

#### Sensitive Data Handling
- **Passwords**: Never stored in plain text, always hashed with bcrypt
- **Emails**: Validated format, used for login (unique constraint)
- **Credits**: Integer only (no decimals to avoid float errors)
- **Personal Data**: Minimal collection (pseudo, email, password only)

#### HTTPS in Production
- **Deployment**: Vercel provides automatic HTTPS
- **Headers**: Security headers configured (HSTS, X-Content-Type-Options)
- **Cookies**: Secure flag enabled in production

#### Environment Secrets
- **Never Committed**: `.env` in `.gitignore`
- **Production**: Secrets configured in hosting platform dashboard
- **Rotation**: JWT_SECRET should be rotated periodically

### CSRF Protection (Planned)
```typescript
// Double submit cookie pattern
// OR SameSite cookie attribute
// To be implemented before production
```

### Rate Limiting (Planned)
```typescript
// Prevent brute force attacks
// 5 login attempts per IP per 15 minutes
// 100 API requests per user per minute
// To be implemented with Redis
```

---

## API Documentation

### API Design Principles

#### RESTful Conventions
- **GET**: Retrieve data (safe, idempotent)
- **POST**: Create new resources
- **PUT**: Update existing resources
- **DELETE**: Remove resources

#### Response Format
**Success**:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message"
}
```

**Error**:
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

### Authentication Endpoints

#### POST /api/auth/register
**Purpose**: Create new user account

**Request Body**:
```json
{
  "email": "user@example.com",
  "pseudo": "JohnDoe",
  "password": "SecurePass123!"
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "cuid...",
      "email": "user@example.com",
      "pseudo": "JohnDoe",
      "role": "PASSENGER",
      "credits": 20
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  },
  "message": "Registration successful"
}
```

**Validation**:
- Email must be unique and valid format
- Pseudo must be unique, 3-20 characters
- Password must meet strength requirements

---

#### POST /api/auth/login
**Purpose**: Authenticate user and receive JWT

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "cuid...",
      "email": "user@example.com",
      "pseudo": "JohnDoe",
      "role": "PASSENGER",
      "credits": 20
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

**Errors**:
- 401: Invalid credentials
- 403: Account suspended

---

### Carpool Endpoints

#### GET /api/carpools/search
**Purpose**: Search for available carpools

**Query Parameters**:
- `from`: Departure city (required)
- `to`: Destination city (required)
- `date`: Travel date in ISO format (required)
- `ecoOnly`: Filter electric/hybrid only (optional, boolean)
- `maxPrice`: Maximum price per seat (optional, number)
- `minRating`: Minimum driver rating (optional, 1-5)

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": "carpool-001",
      "departure": "Paris",
      "destination": "Lyon",
      "departureDate": "2026-02-10T08:00:00Z",
      "departureTime": "08:00",
      "arrivalTime": "12:00",
      "availableSeats": 3,
      "pricePerSeat": 25,
      "platformPrice": 27,
      "driver": {
        "pseudo": "JeanDriver",
        "avgRating": 4.8
      },
      "vehicle": {
        "brand": "Tesla",
        "model": "Model 3",
        "energyType": "ELECTRIC"
      }
    }
  ]
}
```

---

#### GET /api/carpools/[id]
**Purpose**: Get detailed carpool information

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "carpool-001",
    "departure": "Paris",
    "destination": "Lyon",
    "departureDate": "2026-02-10T08:00:00Z",
    "departureTime": "08:00",
    "arrivalTime": "12:00",
    "availableSeats": 3,
    "pricePerSeat": 25,
    "platformPrice": 27,
    "status": "PENDING",
    "driver": {
      "id": "driver-001",
      "pseudo": "JeanDriver",
      "email": "driver@example.com",
      "role": "DRIVER",
      "preferences": {
        "smokingAllowed": false,
        "petsAllowed": true,
        "musicAllowed": true,
        "talkingAllowed": true
      },
      "reviewsReceived": [
        {
          "rating": 5,
          "comment": "Great driver!",
          "author": { "pseudo": "Alice" },
          "createdAt": "2026-01-20T10:00:00Z"
        }
      ]
    },
    "vehicle": {
      "brand": "Tesla",
      "model": "Model 3",
      "energyType": "ELECTRIC",
      "seats": 4
    },
    "bookings": [
      {
        "id": "booking-001",
        "seats": 1,
        "passenger": { "pseudo": "Alice" }
      }
    ]
  }
}
```

---

#### POST /api/carpools
**Purpose**: Create new carpool (Driver only)

**Headers**:
```
Authorization: Bearer {JWT}
```

**Request Body**:
```json
{
  "departure": "Paris",
  "destination": "Lyon",
  "departureDate": "2026-02-10T08:00:00Z",
  "departureTime": "08:00",
  "arrivalTime": "12:00",
  "availableSeats": 3,
  "pricePerSeat": 25,
  "vehicleId": "vehicle-001"
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "id": "carpool-new",
    "platformPrice": 27,
    "status": "PENDING"
  },
  "message": "Carpool created successfully"
}
```

**Business Rules**:
- platformPrice = pricePerSeat + 2 (automatic calculation)
- User must have DRIVER role
- Vehicle must belong to driver
- availableSeats ≤ vehicle.seats

---

### Booking Endpoints

#### POST /api/bookings
**Purpose**: Book seats in a carpool

**Headers**:
```
Authorization: Bearer {JWT}
```

**Request Body**:
```json
{
  "carpoolId": "carpool-001",
  "seats": 2
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "id": "booking-new",
    "carpoolId": "carpool-001",
    "passengerId": "user-001",
    "seats": 2,
    "totalCost": 54,
    "status": "CONFIRMED"
  },
  "message": "Booking successful. Check your email for confirmation."
}
```

**Atomic Transaction**:
1. Check user credits ≥ (platformPrice × seats)
2. Check carpool.availableSeats ≥ seats
3. Create booking record
4. Deduct credits from passenger
5. Decrement availableSeats
6. Send confirmation email (async)
7. Create notifications (async)

**Errors**:
- 400: Insufficient credits
- 400: Not enough seats available
- 409: Cannot book own carpool (driver)

---

### Admin Endpoints

#### POST /api/admin/employees
**Purpose**: Create employee account (Admin only)

**Headers**:
```
Authorization: Bearer {JWT}
```

**Request Body**:
```json
{
  "email": "employee@ecoride.com",
  "pseudo": "NewEmployee",
  "password": "SecurePass123!"
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "id": "employee-new",
    "email": "employee@ecoride.com",
    "pseudo": "NewEmployee",
    "role": "EMPLOYEE"
  },
  "message": "Employee account created"
}
```

---

#### GET /api/admin/analytics
**Purpose**: Platform statistics (Admin only)

**Response** (200):
```json
{
  "success": true,
  "data": {
    "totalUsers": 150,
    "totalCarpools": 45,
    "totalBookings": 120,
    "totalCredits": 3500,
    "carpoolsPerDay": [
      { "date": "2026-02-01", "count": 5 },
      { "date": "2026-02-02", "count": 7 }
    ],
    "creditsPerDay": [
      { "date": "2026-02-01", "credits": 150 },
      { "date": "2026-02-02", "credits": 200 }
    ],
    "recentUsers": [
      { "pseudo": "Alice", "email": "alice@example.com", "createdAt": "..." }
    ]
  }
}
```

---

### Complete API Endpoints List

| Method | Endpoint | Auth | Role | Purpose |
|--------|----------|------|------|---------|
| POST | /api/auth/register | No | - | Create account |
| POST | /api/auth/login | No | - | Login |
| GET | /api/carpools/search | No | - | Search trips |
| GET | /api/carpools/[id] | No | - | Trip details |
| POST | /api/carpools | Yes | DRIVER | Create trip |
| PUT | /api/carpools/[id]/start | Yes | DRIVER | Start trip |
| PUT | /api/carpools/[id]/complete | Yes | DRIVER | Complete trip |
| DELETE | /api/carpools/[id]/cancel | Yes | DRIVER | Cancel trip |
| POST | /api/bookings | Yes | Any | Book trip |
| DELETE | /api/bookings/[id] | Yes | PASSENGER | Cancel booking |
| GET | /api/users/profile | Yes | Any | Get profile |
| PUT | /api/users/profile | Yes | Any | Update profile |
| POST | /api/users/vehicles | Yes | DRIVER | Add vehicle |
| PUT | /api/users/preferences | Yes | DRIVER | Set preferences |
| POST | /api/reviews | Yes | Any | Submit review |
| GET | /api/reviews/pending | Yes | EMPLOYEE | Pending reviews |
| PUT | /api/reviews/[id]/validate | Yes | EMPLOYEE | Approve review |
| PUT | /api/reviews/[id]/reject | Yes | EMPLOYEE | Reject review |
| GET | /api/admin/analytics | Yes | ADMIN | Platform stats |
| POST | /api/admin/employees | Yes | ADMIN | Create employee |
| PUT | /api/admin/users/[id]/suspend | Yes | ADMIN | Suspend user |
| GET | /api/notifications | Yes | Any | Get notifications |
| PUT | /api/notifications | Yes | Any | Mark as read |
| GET | /api/admin/logs | Yes | ADMIN | View logs |

---

## Database Design

### Entity-Relationship Model

**See**: [DATABASE_DOCUMENTATION.md](./DATABASE_DOCUMENTATION.md) for complete details.

**Key Relationships**:
- User 1:N Vehicles
- User (Driver) 1:N Carpools
- Carpool N:1 Vehicle
- Carpool 1:N Bookings
- Booking N:1 User (Passenger)
- User 1:N Reviews (as author)
- User 1:N Reviews (as recipient)
- User 1:1 Preferences

### Data Integrity

#### Foreign Key Constraints
All relationships enforced with `ON DELETE CASCADE`:
- Deleting user deletes their vehicles, carpools, bookings, reviews
- Deleting carpool deletes associated bookings
- Maintains referential integrity automatically

#### Unique Constraints
- `users.email`: UNIQUE
- `users.pseudo`: UNIQUE
- `preferences.userId`: UNIQUE (1:1 relationship)

#### Check Constraints (Application Level)
- `rating` between 1 and 5
- `credits` ≥ 0
- `availableSeats` ≥ 0
- `seats` (in booking) ≥ 1
- `departureDate` in future (at creation)

---

## Deployment Strategy

### Production Environment

#### Hosting Platform: Vercel (Recommended)
**Advantages**:
- **Next.js Native**: Built by Vercel, optimized for Next.js
- **Automatic Deployments**: Push to GitHub → auto-deploy
- **Global CDN**: Fast worldwide access
- **HTTPS Built-In**: Automatic SSL certificates
- **Environment Variables**: Easy secret management
- **Free Tier**: Generous limits for student projects

**Configuration**:
1. Connect GitHub repository
2. Configure build command: `npm run build`
3. Set root directory: `./`
4. Add environment variables in dashboard

#### Database Hosting

**PostgreSQL**: Supabase (Recommended)
- **Free Tier**: 500 MB database, 2 GB bandwidth
- **Features**: Automatic backups, connection pooling, dashboard
- **Integration**: Copy DATABASE_URL to Vercel env vars

**MongoDB**: MongoDB Atlas
- **Free Tier**: 512 MB storage, shared cluster
- **Features**: Automatic backups, monitoring, indexes
- **Integration**: Copy MONGODB_URI to Vercel env vars

### Deployment Steps

#### 1. Prepare Production Build
```bash
# Install dependencies
npm install

# Run Prisma migrations
npx prisma migrate deploy

# Build application
npm run build

# Test production build locally
npm run start
```

#### 2. Deploy Databases
**Supabase (PostgreSQL)**:
1. Create account at supabase.com
2. Create new project
3. Copy connection string (DATABASE_URL)
4. Run migrations: `npx prisma migrate deploy`
5. Run seed: `npx prisma db seed`

**MongoDB Atlas**:
1. Create account at mongodb.com
2. Create free cluster
3. Create database user
4. Add IP whitelist (0.0.0.0/0 for Vercel)
5. Copy connection string (MONGODB_URI)

#### 3. Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

**Or via Dashboard**:
1. Import repository from GitHub
2. Configure environment variables
3. Deploy

#### 4. Configure Environment Variables
**In Vercel Dashboard**:
```
DATABASE_URL=postgresql://...
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-production-secret-32-chars-min
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
NEXT_PUBLIC_APP_URL=https://ecoride.vercel.app
```

#### 5. Verify Deployment
- Test authentication (register, login)
- Test carpool creation
- Test booking flow
- Test email delivery
- Check admin dashboard
- Verify logs are being created

### Continuous Deployment

**Automatic Workflow**:
1. Push to `develop` branch → Deploy to staging URL
2. Merge `develop` to `main` → Deploy to production URL
3. Tag release: `git tag v1.0.0`
4. Vercel automatically builds and deploys

---

## Testing Strategy

### Unit Testing (Recommended)

**Framework**: Jest + React Testing Library

**Installation**:
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

**Test Coverage Goals**:
- Critical components: >80%
- API routes: >70%
- Utilities: >90%

**Example Tests**:
```typescript
// components/__tests__/CarpoolCard.test.tsx
describe('CarpoolCard', () => {
  it('renders carpool information correctly', () => {
    render(<CarpoolCard carpool={mockCarpool} />);
    expect(screen.getByText('Paris → Lyon')).toBeInTheDocument();
  });
  
  it('shows eco badge for electric vehicles', () => {
    const electricCarpool = { ...mockCarpool, vehicle: { energyType: 'ELECTRIC' } };
    render(<CarpoolCard carpool={electricCarpool} />);
    expect(screen.getByText('⚡ Écologique')).toBeInTheDocument();
  });
});
```

### Integration Testing

**API Testing**: Postman/Insomnia Collections

**Test Scenarios**:
1. User registration → Login → JWT verification
2. Create carpool → Search → Book → Confirm
3. Trip lifecycle: Create → Start → Complete → Review
4. Admin: Create employee → Validate review → Suspend user

### End-to-End Testing (Optional)

**Framework**: Playwright

**Critical User Journeys**:
1. **Passenger Flow**: Search → View Details → Login → Book → Receive Email
2. **Driver Flow**: Login → Create Carpool → Start Trip → Complete Trip → Receive Credits
3. **Employee Flow**: Login → View Pending Reviews → Validate Review
4. **Admin Flow**: Login → View Analytics → Create Employee → Suspend User

---

## Performance Optimization

### Database Optimization

**Indexes**:
```sql
CREATE INDEX idx_carpools_search ON carpools(departure, destination, departureDate);
CREATE INDEX idx_carpools_status ON carpools(status);
CREATE INDEX idx_bookings_carpool ON bookings(carpoolId);
CREATE INDEX idx_reviews_recipient ON reviews(recipientId);
```

**Connection Pooling**:
- Prisma: Default pool size 10
- MongoDB: Connection pooling enabled by default

### Next.js Optimization

**Image Optimization**:
```tsx
import Image from 'next/image';

<Image 
  src="/logo.png" 
  alt="EcoRide" 
  width={200} 
  height={50} 
  priority 
/>
```

**Code Splitting**:
- Automatic with Next.js App Router
- Each page is a separate chunk

**Static Generation**:
- Homepage can be statically generated
- `/carpools` should be SSR for fresh data

---

## Monitoring & Maintenance

### Logging Strategy
- **Application Logs**: MongoDB `logs` collection
- **Error Tracking**: Console errors in production (consider Sentry)
- **Performance Monitoring**: Vercel Analytics

### Backup Strategy
- **PostgreSQL**: Daily automated backups (Supabase/Neon)
- **MongoDB**: Daily snapshots (Atlas)
- **Retention**: 30 days minimum

### Maintenance Tasks
- **Weekly**: Review error logs
- **Monthly**: Clean old MongoDB logs (>90 days)
- **Quarterly**: Review and optimize slow queries
- **Yearly**: Rotate JWT_SECRET

---

## Appendices

### Appendix A: User Stories (All 13)

**US1**: Homepage with search  
**US2**: Navigation menu  
**US3**: Carpool listing  
**US4**: Filters (eco, price, duration, rating)  
**US5**: Detailed carpool view  
**US6**: Booking with credit validation  
**US7**: Registration and login  
**US8**: User profile management  
**US9**: Create carpool (driver)  
**US10**: Trip history and cancellation  
**US11**: Trip control (start/complete)  
**US12**: Employee review moderation  
**US13**: Admin dashboard and analytics  

### Appendix B: Test Accounts

```
Admin:
  Email: admin@ecoride.com
  Password: Password123!
  
Employee:
  Email: employee@ecoride.com
  Password: Password123!
  
Driver:
  Email: driver@ecoride.com
  Password: Password123!
  
Passenger:
  Email: passenger@ecoride.com
  Password: Password123!
```

### Appendix C: External Resources

**Documentation**:
- Next.js: https://nextjs.org/docs
- Prisma: https://www.prisma.io/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Radix UI: https://www.radix-ui.com

**Tools**:
- Vercel: https://vercel.com
- Supabase: https://supabase.com
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas

---

**End of Technical Documentation**  
**Version**: 1.0.0  
**Date**: February 2026  
**Author**: EcoRide Development Team
