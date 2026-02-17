# 🗄️ EcoRide Platform - Database Documentation

## Table of Contents
1. [Overview](#overview)
2. [Database Architecture](#database-architecture)
3. [PostgreSQL Schema](#postgresql-schema)
4. [MongoDB Collections](#mongodb-collections)
5. [Entity-Relationship Diagram](#entity-relationship-diagram)
6. [Data Dictionary](#data-dictionary)

---

## Overview

EcoRide uses a **hybrid database architecture** combining:
- **PostgreSQL** (Relational): Core business data with ACID compliance
- **MongoDB** (NoSQL): Logging, notifications, and analytics

### Design Decisions
- **PostgreSQL** chosen for:
  - Complex relationships (users, bookings, vehicles)
  - Transactional integrity (credit operations, bookings)
  - Strong consistency requirements
  - Advanced querying with JOINs

- **MongoDB** chosen for:
  - High-volume logging without affecting main database
  - Flexible schema for notifications
  - Time-series data (statistics)
  - Fast writes for audit trails

---

## Database Architecture

```
┌─────────────────────────────────────────┐
│         APPLICATION LAYER               │
│  (Next.js API Routes + Prisma ORM)      │
└──────────────┬──────────────────────────┘
               │
      ┌────────┴────────┐
      │                 │
      ▼                 ▼
┌──────────┐      ┌──────────┐
│PostgreSQL│      │ MongoDB  │
│          │      │          │
│ • Users  │      │ • Logs   │
│ • Carpools│     │ • Notifs │
│ • Bookings│     │ • Stats  │
│ • Vehicles│     │          │
│ • Reviews │     │          │
└──────────┘      └──────────┘
```

---

## PostgreSQL Schema

### Tables Overview

| Table | Purpose | Key Relationships |
|-------|---------|-------------------|
| `users` | User accounts and authentication | 1:N vehicles, carpools, bookings, reviews |
| `vehicles` | Driver vehicles | N:1 users, 1:N carpools |
| `carpools` | Trip listings | N:1 users (driver), N:1 vehicles, 1:N bookings |
| `bookings` | Passenger reservations | N:1 carpools, N:1 users (passenger) |
| `reviews` | User ratings | N:1 users (author), N:1 users (recipient) |
| `preferences` | Driver preferences | 1:1 users |

### Enumerations

#### UserRole
```sql
'PASSENGER' - Default role, can book trips
'DRIVER'    - Can create and manage carpools
'EMPLOYEE'  - Can moderate reviews
'ADMIN'     - Full platform access
```

#### CarpoolStatus
```sql
'PENDING'     - Available for booking
'IN_PROGRESS' - Trip started
'COMPLETED'   - Trip finished, credits awarded
'CANCELLED'   - Trip cancelled, refunds issued
```

#### BookingStatus
```sql
'PENDING'   - Awaiting confirmation
'CONFIRMED' - Active reservation
'CANCELLED' - Cancelled by user
```

#### VehicleEnergyType
```sql
'ELECTRIC' - Zero emissions ⚡
'HYBRID'   - Partial eco-friendly 🔋
'GASOLINE' - Traditional fuel
'DIESEL'   - Traditional fuel
```

#### ReviewStatus
```sql
'PENDING'  - Awaiting employee validation
'APPROVED' - Published and visible
'REJECTED' - Hidden by moderator
```

---

## MongoDB Collections

### logs
**Purpose**: Audit trail of all platform actions

```typescript
interface LogEntry {
  _id: ObjectId;
  timestamp: Date;
  action: string;               // 'login_success', 'booking_created', 'trip_started', etc.
  userId: string;               // User who performed action
  userEmail: string;
  userRole: string;
  details: Record<string, any>; // Action-specific metadata
  ipAddress?: string;           // User IP for security
  userAgent?: string;           // Browser/device info
  statusCode?: number;          // HTTP status
  errorMessage?: string;        // For failed operations
}
```

**Indexes**: 
- `timestamp` (descending)
- `userId`
- `action`

**Retention**: 90 days (configurable via `deleteOldLogs()`)

### notifications
**Purpose**: In-app user notifications

```typescript
interface Notification {
  _id: ObjectId;
  userId: string;
  type: 'booking' | 'trip_start' | 'trip_complete' | 'trip_cancel' | 'review' | 'credits' | 'admin';
  title: string;
  message: string;
  data: Record<string, any>;  // Context data (carpoolId, amount, etc.)
  read: boolean;
  createdAt: Date;
}
```

**Indexes**:
- `userId + read + createdAt` (compound)
- `createdAt` (TTL index - auto-delete after 30 days)

---

## Entity-Relationship Diagram

### Conceptual Model (MCD)

```
┌────────────┐
│    USER    │
├────────────┤
│ id         │◄───┐
│ email      │    │
│ pseudo     │    │
│ password   │    │
│ role       │    │
│ credits    │    │
│ suspended  │    │
└────────────┘    │
      │ 1         │
      │ owns      │
      │           │
      ▼ N         │
┌────────────┐    │
│  VEHICLE   │    │
├────────────┤    │
│ id         │    │
│ brand      │    │
│ model      │    │
│ energyType │    │
│ seats      │    │
│ userId     │────┘
└────────────┘
      │ 1
      │ used in
      │
      ▼ N
┌────────────┐         1 ┌────────────┐
│  CARPOOL   │◄──────────│    USER    │
├────────────┤   creates │  (driver)  │
│ id         │           └────────────┘
│ departure  │
│ destination│
│ date/time  │           ┌────────────┐
│ seats      │         N │  BOOKING   │
│ price      │◄──────────├────────────┤
│ status     │    has    │ id         │
│ driverId   │           │ carpoolId  │
│ vehicleId  │           │ passengerId│
└────────────┘           │ seats      │
                         │ status     │
                         └────────────┘
                               │ N
                               │ made by
                               │
                               ▼ 1
                         ┌────────────┐
                         │    USER    │
                         │ (passenger)│
                         └────────────┘

┌────────────┐           ┌────────────┐
│    USER    │ 1       N │   REVIEW   │
│  (author)  │◄──────────├────────────┤
└────────────┘    gives  │ id         │
                         │ rating     │
┌────────────┐           │ comment    │
│    USER    │ 1       N │ status     │
│ (recipient)│◄──────────│ authorId   │
└────────────┘  receives │ recipientId│
                         └────────────┘

┌────────────┐           ┌────────────┐
│    USER    │ 1       1 │ PREFERENCE │
│            │◄──────────├────────────┤
└────────────┘    has    │ id         │
                         │ smoking    │
                         │ pets       │
                         │ music      │
                         │ talking    │
                         │ userId     │
                         └────────────┘
```

---

## Data Dictionary

### users

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PRIMARY KEY | Unique identifier (CUID) |
| email | TEXT | UNIQUE, NOT NULL | User email address |
| pseudo | TEXT | UNIQUE, NOT NULL | Display name (username) |
| password | TEXT | NOT NULL | Bcrypt hashed password |
| role | UserRole | NOT NULL, DEFAULT 'PASSENGER' | User role/permissions |
| credits | INTEGER | NOT NULL, DEFAULT 20 | Platform credits balance |
| suspended | BOOLEAN | NOT NULL, DEFAULT false | Account suspension status |
| createdAt | TIMESTAMP | NOT NULL, DEFAULT NOW() | Account creation date |
| updatedAt | TIMESTAMP | NOT NULL, DEFAULT NOW() | Last modification date |

**Business Rules**:
- New users receive 20 credits for free
- Email must be valid format (validated in API)
- Password minimum 8 chars, 1 uppercase, 1 number, 1 special char
- Suspended users cannot login

---

### vehicles

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PRIMARY KEY | Unique identifier |
| brand | TEXT | NOT NULL | Vehicle manufacturer |
| model | TEXT | NOT NULL | Vehicle model name |
| energyType | VehicleEnergyType | NOT NULL | Fuel/energy type |
| seats | INTEGER | NOT NULL | Total seat capacity |
| userId | TEXT | FOREIGN KEY → users(id), NOT NULL | Owner reference |
| createdAt | TIMESTAMP | NOT NULL | Record creation |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Business Rules**:
- Only DRIVER role can own vehicles
- Seats must be ≥ 2 and ≤ 8
- Deleting user cascades to delete vehicles

---

### carpools

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PRIMARY KEY | Unique identifier |
| departure | TEXT | NOT NULL | Origin city/location |
| destination | TEXT | NOT NULL | Destination city/location |
| departureDate | TIMESTAMP | NOT NULL | Trip date and time |
| departureTime | TEXT | NOT NULL | Formatted time (HH:MM) |
| arrivalTime | TEXT | NOT NULL | Estimated arrival (HH:MM) |
| availableSeats | INTEGER | NOT NULL | Remaining available seats |
| pricePerSeat | INTEGER | NOT NULL | Driver's price (credits) |
| platformPrice | INTEGER | NOT NULL | Total price (pricePerSeat + 2) |
| status | CarpoolStatus | NOT NULL, DEFAULT 'PENDING' | Trip status |
| driverId | TEXT | FOREIGN KEY → users(id), NOT NULL | Driver reference |
| vehicleId | TEXT | FOREIGN KEY → vehicles(id), NOT NULL | Vehicle reference |
| createdAt | TIMESTAMP | NOT NULL | Record creation |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Business Rules**:
- Platform adds +2 credits to driver's price
- availableSeats must be ≤ vehicle.seats
- departureDate must be in future (validated in API)
- Only driver can modify or cancel trip
- Status PENDING → IN_PROGRESS → COMPLETED (state machine)

---

### bookings

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PRIMARY KEY | Unique identifier |
| carpoolId | TEXT | FOREIGN KEY → carpools(id), NOT NULL | Trip reference |
| passengerId | TEXT | FOREIGN KEY → users(id), NOT NULL | Passenger reference |
| seats | INTEGER | NOT NULL, DEFAULT 1 | Number of seats booked |
| status | BookingStatus | NOT NULL, DEFAULT 'PENDING' | Booking status |
| confirmed | BOOLEAN | NOT NULL, DEFAULT false | Trip completion confirmation |
| createdAt | TIMESTAMP | NOT NULL | Booking time |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Business Rules**:
- Passenger must have credits ≥ (carpool.platformPrice × seats)
- Credits deducted immediately on booking
- Booking decrements carpool.availableSeats (atomic transaction)
- Cancellation refunds credits and increments availableSeats
- Driver receives credits only after trip COMPLETED

---

### reviews

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PRIMARY KEY | Unique identifier |
| rating | INTEGER | NOT NULL | Rating (1-5 stars) |
| comment | TEXT | NOT NULL | Review text |
| status | ReviewStatus | NOT NULL, DEFAULT 'PENDING' | Moderation status |
| authorId | TEXT | FOREIGN KEY → users(id), NOT NULL | Reviewer |
| recipientId | TEXT | FOREIGN KEY → users(id), NOT NULL | Reviewed user |
| createdAt | TIMESTAMP | NOT NULL | Review submission |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Business Rules**:
- Rating must be 1-5
- Only APPROVED reviews are publicly visible
- EMPLOYEE role required to validate/reject
- Users can only review after COMPLETED trip

---

### preferences

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | TEXT | PRIMARY KEY | Unique identifier |
| smokingAllowed | BOOLEAN | NOT NULL, DEFAULT false | Allow smoking in vehicle |
| petsAllowed | BOOLEAN | NOT NULL, DEFAULT false | Allow pets in vehicle |
| musicAllowed | BOOLEAN | NOT NULL, DEFAULT true | Music during trip |
| talkingAllowed | BOOLEAN | NOT NULL, DEFAULT true | Conversation during trip |
| userId | TEXT | FOREIGN KEY → users(id), UNIQUE, NOT NULL | User reference (1:1) |
| createdAt | TIMESTAMP | NOT NULL | Record creation |
| updatedAt | TIMESTAMP | NOT NULL | Last modification |

**Business Rules**:
- One preference record per user (1:1 relationship)
- Only relevant for users with DRIVER role
- Displayed on carpool detail page

---

## Database Indexes

### Recommended Indexes for Performance

```sql
-- Users
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_suspended ON users(suspended);

-- Carpools (most queried table)
CREATE INDEX idx_carpools_departure ON carpools(departure);
CREATE INDEX idx_carpools_destination ON carpools(destination);
CREATE INDEX idx_carpools_departure_date ON carpools(departureDate);
CREATE INDEX idx_carpools_status ON carpools(status);
CREATE INDEX idx_carpools_driver ON carpools(driverId);
CREATE INDEX idx_carpools_search ON carpools(departure, destination, departureDate, status);

-- Bookings
CREATE INDEX idx_bookings_carpool ON bookings(carpoolId);
CREATE INDEX idx_bookings_passenger ON bookings(passengerId);
CREATE INDEX idx_bookings_status ON bookings(status);

-- Reviews
CREATE INDEX idx_reviews_recipient ON reviews(recipientId);
CREATE INDEX idx_reviews_status ON reviews(status);
```

---

## Transaction Examples

### Booking Creation (ACID Transaction)
```typescript
await prisma.$transaction(async (tx) => {
  // 1. Deduct passenger credits
  await tx.user.update({
    where: { id: passengerId },
    data: { credits: { decrement: totalCost } }
  });
  
  // 2. Decrement available seats
  await tx.carpool.update({
    where: { id: carpoolId },
    data: { availableSeats: { decrement: seats } }
  });
  
  // 3. Create booking record
  const booking = await tx.booking.create({
    data: { carpoolId, passengerId, seats, status: 'CONFIRMED' }
  });
  
  return booking;
});
```

### Trip Completion (Credit Transfer)
```typescript
await prisma.$transaction(async (tx) => {
  // 1. Update carpool status
  await tx.carpool.update({
    where: { id: carpoolId },
    data: { status: 'COMPLETED' }
  });
  
  // 2. Award credits to driver
  const creditsEarned = pricePerSeat * totalPassengers;
  await tx.user.update({
    where: { id: driverId },
    data: { credits: { increment: creditsEarned } }
  });
  
  // 3. Update all bookings
  await tx.booking.updateMany({
    where: { carpoolId },
    data: { confirmed: true }
  });
});
```

---

## Backup and Maintenance

### Backup Strategy
- **PostgreSQL**: Daily automated backups via hosting provider (Supabase/Neon)
- **MongoDB**: Daily snapshots via MongoDB Atlas
- **Retention**: 30 days for both databases

### Maintenance Tasks
```sql
-- Clean old logs (run monthly)
DELETE FROM logs WHERE timestamp < NOW() - INTERVAL '90 days';

-- Recalculate user statistics (run weekly)
UPDATE users SET 
  total_trips = (SELECT COUNT(*) FROM bookings WHERE passengerId = users.id AND status = 'CONFIRMED'),
  avg_rating = (SELECT AVG(rating) FROM reviews WHERE recipientId = users.id AND status = 'APPROVED');

-- Archive completed trips (run quarterly)
INSERT INTO carpools_archive SELECT * FROM carpools WHERE status = 'COMPLETED' AND updatedAt < NOW() - INTERVAL '6 months';
DELETE FROM carpools WHERE status = 'COMPLETED' AND updatedAt < NOW() - INTERVAL '6 months';
```

---

## Security Considerations

### Password Security
- **Hashing**: bcrypt with 10 salt rounds
- **Policy**: Minimum 8 characters, 1 uppercase, 1 number, 1 special character
- **Storage**: Never stored in plain text

### Data Protection
- **PII Encryption**: Sensitive fields encrypted at rest (hosting provider)
- **Access Control**: Row-level security (RLS) policies in production
- **Audit Trail**: All modifications logged in MongoDB

### SQL Injection Prevention
- **Prisma ORM**: All queries parameterized
- **Input Validation**: Strict validation on all API inputs
- **Type Safety**: TypeScript ensures type correctness

---

## Migration History

### Initial Schema (v1.0.0)
- Created all 6 core tables
- Established relationships and constraints
- Seeded test data

### Future Migrations
- v1.1.0: Add `rating_cache` column to users for performance
- v1.2.0: Add `route_polyline` to carpools for map display
- v2.0.0: Add `messages` table for in-app chat

---

## Support and Troubleshooting

### Common Issues

**Issue**: Foreign key constraint violation on booking creation
**Solution**: Verify carpool exists and has availableSeats > 0

**Issue**: Credits not awarded to driver
**Solution**: Ensure trip status is COMPLETED, check transaction logs

**Issue**: Duplicate email on registration
**Solution**: Email uniqueness enforced - use different email

### Monitoring Queries

```sql
-- Active trips count
SELECT COUNT(*) FROM carpools WHERE status = 'IN_PROGRESS';

-- Users with insufficient credits
SELECT pseudo, credits FROM users WHERE credits < 5;

-- Pending reviews count
SELECT COUNT(*) FROM reviews WHERE status = 'PENDING';

-- Today's bookings
SELECT COUNT(*) FROM bookings WHERE DATE(createdAt) = CURRENT_DATE;
```

---

**Last Updated**: February 2026  
**Schema Version**: 1.0.0  
**Maintained By**: EcoRide Development Team
