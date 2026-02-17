# 📊 EcoRide Platform - UML Diagrams

## Table of Contents
1. [Use Case Diagrams](#use-case-diagrams)
2. [Sequence Diagrams](#sequence-diagrams)
3. [Class Diagram](#class-diagram)
4. [State Diagrams](#state-diagrams)

---

## Use Case Diagrams

### 1. Global System - All Actors

```
                                ECORIDE PLATFORM
    ┌────────────────────────────────────────────────────────────────┐
    │                                                                │
    │   ┌──────────────────┐        ┌──────────────────┐           │
    │   │  Search Carpools │        │  View Carpool    │           │
    │   │                  │        │  Details         │           │
    │   └────────┬─────────┘        └─────────┬────────┘           │
    │            │                            │                     │
    │   ┌────────┴──────────┐       ┌────────┴────────┐            │
    │   │  Apply Filters    │       │  View Driver    │            │
    │   │  (Eco, Price)     │       │  Profile        │            │
    │   └───────────────────┘       └─────────────────┘            │
    │                                                                │
┌───┼───────────────────────────────────────────────┐               │
│   │                                               │               │
│   │   ┌──────────────────┐      ┌──────────────┐ │               │
│   │   │  Book Carpool    │      │  Cancel      │ │               │
│   │   │  (Pay Credits)   │      │  Booking     │ │               │
│   │   └────────┬─────────┘      └──────┬───────┘ │               │
│ Passenger                               │         │               │
│   │   ┌────────┴──────────┐    ┌───────┴───────┐ │               │
│   │   │  Confirm Trip     │    │  Leave Review │ │               │
│   │   │  Completion       │    │  (After Trip) │ │               │
│   │   └───────────────────┘    └───────────────┘ │               │
│   │                                               │               │
└───┼───────────────────────────────────────────────┘               │
    │                                                                │
┌───┼───────────────────────────────────────────────┐               │
│   │                                               │               │
│   │   ┌──────────────────┐      ┌──────────────┐ │               │
│   │   │  Create Carpool  │      │  Start Trip  │ │               │
│   │   │  Listing         │      │              │ │               │
│   │   └────────┬─────────┘      └──────┬───────┘ │               │
│ Driver                                  │         │               │
│   │   ┌────────┴──────────┐    ┌───────┴───────┐ │               │
│   │   │  Manage Vehicle   │    │  Complete     │ │               │
│   │   │  (Add, Edit)      │    │  Trip         │ │               │
│   │   └───────────────────┘    └───┬───────────┘ │               │
│   │                                 │             │               │
│   │   ┌──────────────────┐      ┌───┴─────────┐  │               │
│   │   │  Set Preferences │      │  Cancel     │  │               │
│   │   │  (Pets, Smoking) │      │  Trip       │  │               │
│   │   └───────────────────┘      └─────────────┘  │               │
│   │                                               │               │
└───┼───────────────────────────────────────────────┘               │
    │                                                                │
┌───┼───────────────────────────────────────────────┐               │
│   │                                               │               │
│   │   ┌──────────────────┐      ┌──────────────┐ │               │
│   │   │  View Pending    │      │  Validate    │ │               │
│   │   │  Reviews         │      │  Review      │ │               │
│   │   └────────┬─────────┘      └──────┬───────┘ │               │
│ Employee                                │         │               │
│   │            │                ┌───────┴───────┐ │               │
│   │            └────────────────┤  Reject       │ │               │
│   │                             │  Review       │ │               │
│   │   ┌──────────────────┐      └───────────────┘ │               │
│   │   │  View Problematic│                        │               │
│   │   │  Trips           │                        │               │
│   │   └───────────────────┘                        │               │
│   │                                               │               │
└───┼───────────────────────────────────────────────┘               │
    │                                                                │
┌───┼───────────────────────────────────────────────┐               │
│   │                                               │               │
│   │   ┌──────────────────┐      ┌──────────────┐ │               │
│   │   │  Create Employee │      │  View        │ │               │
│   │   │  Account         │      │  Analytics   │ │               │
│   │   └───────────────────┘      └──────┬───────┘ │               │
│ Admin                                    │         │               │
│   │   ┌──────────────────┐       ┌──────┴───────┐ │               │
│   │   │  Suspend/        │       │  View Daily  │ │               │
│   │   │  Unsuspend User  │       │  Statistics  │ │               │
│   │   └───────────────────┘       └──────────────┘ │               │
│   │                                               │               │
└───┼───────────────────────────────────────────────┘               │
    │                                                                │
┌───┼───────────────────────────────────────────────┐               │
│   │                                               │               │
│   │   ┌──────────────────┐      ┌──────────────┐ │               │
│ Visitor  │  Create Account  │      │  Login       │ │               │
│   │   │  (Register)      │      │              │ │               │
│   │   └───────────────────┘      └──────────────┘ │               │
│   │                                               │               │
└───┴───────────────────────────────────────────────┘               │
    │                                                                │
    └────────────────────────────────────────────────────────────────┘
```

---

### 2. Passenger Use Cases (Detailed)

```
┌─────────────────────────────────────────────────────────┐
│                   PASSENGER USE CASES                   │
├─────────────────────────────────────────────────────────┤
│                                                         │
│           ┌─────────────────────────┐                   │
│           │   Search for Carpool   │                   │
│           └───────┬─────────────────┘                   │
│                   │ <<include>>                         │
│           ┌───────▼─────────────────┐                   │
│   ┌───────┤   Apply Eco Filter     │                   │
│   │       └─────────────────────────┘                   │
│   │       ┌─────────────────────────┐                   │
│   │       │  Apply Price Filter     │                   │
│   │       └─────────────────────────┘                   │
│   │       ┌─────────────────────────┐                   │
│   │       │  Apply Rating Filter    │                   │
│   │       └─────────────────────────┘                   │
│   │                                                     │
│   │       ┌─────────────────────────┐                   │
│   │       │  View Carpool Details  │                   │
│   │       └───────┬─────────────────┘                   │
│   │               │ <<extend>>                          │
│   │       ┌───────▼─────────────────┐                   │
│   │       │  View Driver Reviews   │                   │
│   │       └─────────────────────────┘                   │
│   │               │ <<extend>>                          │
│   │       ┌───────▼─────────────────┐                   │
│   │       │  View Vehicle Info     │                   │
│   │       └─────────────────────────┘                   │
│   │                                                     │
│ Passenger ┌─────────────────────────┐                   │
│   ├───────┤  Book Carpool          │                   │
│   │       └───────┬─────────────────┘                   │
│   │               │ <<include>>                         │
│   │       ┌───────▼─────────────────┐                   │
│   │       │  Check Credits Balance │                   │
│   │       └─────────────────────────┘                   │
│   │               │ <<include>>                         │
│   │       ┌───────▼─────────────────┐                   │
│   │       │  Double Confirmation   │                   │
│   │       └─────────────────────────┘                   │
│   │                                                     │
│   │       ┌─────────────────────────┐                   │
│   ├───────┤  Cancel Booking        │                   │
│   │       └───────┬─────────────────┘                   │
│   │               │ <<include>>                         │
│   │       ┌───────▼─────────────────┐                   │
│   │       │  Refund Credits        │                   │
│   │       └─────────────────────────┘                   │
│   │                                                     │
│   │       ┌─────────────────────────┐                   │
│   ├───────┤  Confirm Trip          │                   │
│   │       │  Completion            │                   │
│   │       └─────────────────────────┘                   │
│   │                                                     │
│   │       ┌─────────────────────────┐                   │
│   └───────┤  Leave Review          │                   │
│           └───────┬─────────────────┘                   │
│                   │ <<include>>                         │
│           ┌───────▼─────────────────┐                   │
│           │  Submit for Validation │                   │
│           └─────────────────────────┘                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Sequence Diagrams

### 1. Booking a Carpool (Complete Flow)

```
Passenger    Frontend      Auth API    Booking API    Database    Email Service
   │             │             │            │             │             │
   │   Click     │             │            │             │             │
   │  "Book"     │             │            │             │             │
   ├────────────>│             │            │             │             │
   │             │  Verify JWT │            │             │             │
   │             ├────────────>│            │             │             │
   │             │  User Data  │            │             │             │
   │             │<────────────┤            │             │             │
   │             │             │            │             │             │
   │             │  POST /api/bookings     │             │             │
   │             ├────────────────────────>│             │             │
   │             │             │            │ BEGIN TRANSACTION         │
   │             │             │            ├────────────>│             │
   │             │             │            │ Check Credits│            │
   │             │             │            │ Check Seats  │            │
   │             │             │            │<─────────────┤            │
   │             │             │            │             │             │
   │             │             │            │ Deduct Credits            │
   │             │             │            ├────────────>│             │
   │             │             │            │ Create Booking            │
   │             │             │            ├────────────>│             │
   │             │             │            │ Decrement Seats           │
   │             │             │            ├────────────>│             │
   │             │             │            │ COMMIT      │             │
   │             │             │            ├────────────>│             │
   │             │             │            │ Success     │             │
   │             │             │            │<─────────────┤            │
   │             │             │            │             │             │
   │             │             │            │ Send Confirmation Email   │
   │             │             │            ├─────────────────────────>│
   │             │             │            │             │   (async)   │
   │             │             │            │             │             │
   │             │             │            │ Create Logs/Notifications │
   │             │             │            ├────────────>MongoDB       │
   │             │             │            │             │             │
   │             │  Success Response        │             │             │
   │             │<─────────────────────────┤             │             │
   │  Booking    │             │            │             │             │
   │  Confirmed! │             │            │             │             │
   │<<─────────────            │            │             │             │
   │             │             │            │             │             │
```

---

### 2. Trip Lifecycle (Start to Completion)

```
Driver      Frontend    Carpool API    Database    Email Service    MongoDB
  │             │            │             │             │             │
  │ Click       │            │             │             │             │
  │ "Start Trip"│            │             │             │             │
  ├────────────>│            │             │             │             │
  │             │ PUT /api/carpools/{id}/start           │             │
  │             ├───────────>│             │             │             │
  │             │            │ Verify Driver│            │             │
  │             │            ├────────────>│             │             │
  │             │            │ Update Status│            │             │
  │             │            │ = IN_PROGRESS│            │             │
  │             │            ├────────────>│             │             │
  │             │            │             │             │             │
  │             │            │ Get All Passengers        │             │
  │             │            ├────────────>│             │             │
  │             │            │ Passengers  │             │             │
  │             │            │<─────────────┤            │             │
  │             │            │             │             │             │
  │             │            │ Send "Trip Started" Emails              │
  │             │            ├─────────────────────────>│             │
  │             │            │   (Parallel to all)      │             │
  │             │            │             │             │             │
  │             │            │ Create Notifications      │             │
  │             │            ├──────────────────────────────────────>│
  │             │            │             │             │             │
  │             │  Success   │             │             │             │
  │             │<───────────┤             │             │             │
  │  Trip       │            │             │             │             │
  │  Started!   │            │             │             │             │
  │<─────────────            │             │             │             │
  │             │            │             │             │             │
  │   [Time passes - Trip happens]         │             │             │
  │             │            │             │             │             │
  │ Click       │            │             │             │             │
  │ "Complete"  │            │             │             │             │
  ├────────────>│            │             │             │             │
  │             │ PUT /api/carpools/{id}/complete        │             │
  │             ├───────────>│             │             │             │
  │             │            │ BEGIN TRANSACTION         │             │
  │             │            ├────────────>│             │             │
  │             │            │ Update Status│            │             │
  │             │            │ = COMPLETED  │            │             │
  │             │            ├────────────>│             │             │
  │             │            │             │             │             │
  │             │            │ Calculate Credits         │             │
  │             │            │ = price × passengers      │             │
  │             │            │             │             │             │
  │             │            │ Credit Driver│            │             │
  │             │            ├────────────>│             │             │
  │             │            │ COMMIT      │             │             │
  │             │            ├────────────>│             │             │
  │             │            │             │             │             │
  │             │            │ Send "Leave Review" Emails              │
  │             │            ├─────────────────────────>│             │
  │             │            │             │             │             │
  │             │            │ Create Notifications      │             │
  │             │            ├──────────────────────────────────────>│
  │             │            │             │             │             │
  │             │  Credits Earned          │             │             │
  │             │<───────────┤             │             │             │
  │  +25        │            │             │             │             │
  │  Credits!   │            │             │             │             │
  │<─────────────            │             │             │             │
  │             │            │             │             │             │
```

---

### 3. Review Validation (Employee Moderation)

```
Passenger    Frontend    Review API    Database    Employee    Admin Panel
   │             │            │            │             │            │
   │ Leave       │            │            │             │            │
   │ Review      │            │            │             │            │
   ├────────────>│            │            │             │            │
   │             │ POST /api/reviews       │             │            │
   │             ├───────────>│            │             │            │
   │             │            │ Create Review            │            │
   │             │            │ status=PENDING           │            │
   │             │            ├───────────>│             │            │
   │             │  Submitted │            │             │            │
   │             │<───────────┤            │             │            │
   │  Review     │            │            │             │            │
   │  Pending... │            │            │             │            │
   │<─────────────            │            │             │            │
   │             │            │            │             │            │
   │             │            │            │  Employee Logs In        │
   │             │            │            │             ├───────────>│
   │             │            │            │             │ View Pending│
   │             │            │ GET /api/reviews/pending │  Reviews   │
   │             │            │<───────────────────────────────────────┤
   │             │            │ List of Pending          │            │
   │             │            │ Reviews                  │            │
   │             │            ├──────────────────────────────────────>│
   │             │            │            │             │            │
   │             │            │            │  Employee Reviews Content│
   │             │            │            │  Decision: Approve       │
   │             │            │            │             │            │
   │             │            │ PUT /api/reviews/{id}/validate        │
   │             │            │<───────────────────────────────────────┤
   │             │            │ Update Review│            │            │
   │             │            │ status=APPROVED          │            │
   │             │            ├───────────>│             │            │
   │             │            │ Success    │             │            │
   │             │            ├──────────────────────────────────────>│
   │             │            │            │             │  "Approved"│
   │             │            │            │             │            │
   │             │  [Review now visible to public]       │            │
   │             │            │            │             │            │
```

---

### 4. User Registration Flow

```
Visitor     Frontend    Registration    Database    Email Service
   │            │            API            │             │
   │  Navigate  │            │              │             │
   │  to /register          │              │             │
   ├───────────>│            │              │             │
   │  Form      │            │              │             │
   │  Rendered  │            │              │             │
   │<───────────┤            │              │             │
   │            │            │              │             │
   │  Fill Form │            │              │             │
   │  Submit    │            │              │             │
   ├───────────>│            │              │             │
   │            │ Validate Client-Side      │             │
   │            │ - Email format            │             │
   │            │ - Password strength       │             │
   │            │ - Pseudo length           │             │
   │            │            │              │             │
   │            │ POST /api/auth/register   │             │
   │            ├───────────>│              │             │
   │            │            │ Validate     │             │
   │            │            │ - Unique email            │
   │            │            │ - Unique pseudo           │
   │            │            ├─────────────>│            │
   │            │            │ Check exists │            │
   │            │            │<──────────────            │
   │            │            │              │             │
   │            │            │ Hash Password│            │
   │            │            │ (bcrypt)     │             │
   │            │            │              │             │
   │            │            │ Create User  │             │
   │            │            │ credits=20   │             │
   │            │            │ role=PASSENGER            │
   │            │            ├─────────────>│            │
   │            │            │ User created │            │
   │            │            │<──────────────            │
   │            │            │              │             │
   │            │            │ Generate JWT │             │
   │            │            │ (7 days)     │             │
   │            │            │              │             │
   │            │            │ Log action to MongoDB     │
   │            │            │              │             │
   │            │  Success + Token          │             │
   │            │<───────────┤              │             │
   │  Redirect  │            │              │             │
   │  to /carpools          │              │             │
   │<───────────┤            │              │             │
   │  Logged In!│            │              │             │
   │            │            │              │             │
```

---

## Class Diagram

### Core Domain Models

```
┌─────────────────────────┐
│        User             │
├─────────────────────────┤
│ - id: string            │
│ - email: string         │
│ - pseudo: string        │
│ - password: string      │
│ - role: UserRole        │
│ - credits: number       │
│ - suspended: boolean    │
├─────────────────────────┤
│ + register()            │
│ + login()               │
│ + addCredits(amount)    │
│ + deductCredits(amount) │
│ + suspend()             │
└───────┬─────────────────┘
        │ 1
        │ owns
        │
        ▼ 0..*
┌─────────────────────────┐
│       Vehicle           │
├─────────────────────────┤
│ - id: string            │
│ - brand: string         │
│ - model: string         │
│ - energyType: Enum      │
│ - seats: number         │
│ - userId: string        │
├─────────────────────────┤
│ + isElectric(): boolean │
│ + getTotalSeats()       │
└─────────────────────────┘

┌─────────────────────────┐         ┌─────────────────────────┐
│       Carpool           │ 1     1 │       User              │
├─────────────────────────┤◄────────┤      (Driver)           │
│ - id: string            │  driver └─────────────────────────┘
│ - departure: string     │
│ - destination: string   │
│ - departureDate: Date   │         ┌─────────────────────────┐
│ - availableSeats: number│ 1     1 │       Vehicle           │
│ - pricePerSeat: number  │◄────────┤                         │
│ - platformPrice: number │ vehicle └─────────────────────────┘
│ - status: CarpoolStatus │
├─────────────────────────┤
│ + start()               │
│ + complete()            │         ┌─────────────────────────┐
│ + cancel()              │ 1   0..*│       Booking           │
│ + calculatePrice()      │◄────────├─────────────────────────┤
└─────────────────────────┘         │ - id: string            │
                                    │ - carpoolId: string     │
                                    │ - passengerId: string   │
                                    │ - seats: number         │
                                    │ - status: BookingStatus │
                                    ├─────────────────────────┤
                                    │ + confirm()             │
                                    │ + cancel()              │
                                    │ + refund()              │
                                    └───────┬─────────────────┘
                                            │ 0..*
                                            │ made by
                                            │
                                            ▼ 1
                                    ┌─────────────────────────┐
                                    │       User              │
                                    │     (Passenger)         │
                                    └─────────────────────────┘

┌─────────────────────────┐         ┌─────────────────────────┐
│       Review            │ 0..*  1 │       User              │
├─────────────────────────┤◄────────┤      (Author)           │
│ - id: string            │  author └─────────────────────────┘
│ - rating: number        │
│ - comment: string       │         ┌─────────────────────────┐
│ - status: ReviewStatus  │ 0..*  1 │       User              │
├─────────────────────────┤◄────────┤     (Recipient)         │
│ + approve()             │recipient└─────────────────────────┘
│ + reject()              │
│ + calculateAvgRating()  │
└─────────────────────────┘
```

---

## State Diagrams

### 1. Carpool Status State Machine

```
        ┌─────────────┐
        │   CREATED   │
        └──────┬──────┘
               │ Driver publishes
               │
               ▼
        ┌─────────────┐
    ┌───┤   PENDING   │◄───────────┐
    │   └──────┬──────┘            │
    │          │                   │
    │          │ Driver clicks     │ Only if no
    │          │ "Start Trip"      │ bookings yet
    │          │                   │
    │          ▼                   │
    │   ┌──────────────┐           │
    │   │ IN_PROGRESS  │           │
    │   └──────┬───────┘           │
    │          │                   │
    │          │ Driver clicks     │
    │          │ "Complete Trip"   │
    │          │                   │
    │          ▼                   │
    │   ┌──────────────┐           │
    │   │  COMPLETED   │           │
    │   └──────────────┘           │
    │                              │
    │ Driver/Passenger             │
    │ cancels                      │
    │                              │
    └──────────────────────────────┘
               │
               ▼
        ┌─────────────┐
        │  CANCELLED  │
        └─────────────┘
          [TERMINAL]
```

---

### 2. Booking Status State Machine

```
        ┌─────────────┐
        │   CREATED   │
        └──────┬──────┘
               │ Payment successful
               │ Seats available
               │
               ▼
        ┌─────────────┐
    ┌───┤  CONFIRMED  │
    │   └──────┬──────┘
    │          │
    │          │ Trip completed
    │          │ + confirmed by passenger
    │          │
    │          ▼
    │   ┌──────────────┐
    │   │   COMPLETED  │
    │   └──────────────┘
    │     [TERMINAL]
    │
    │ Passenger cancels
    │ OR
    │ Driver cancels trip
    │
    └──────────────┐
                   │
                   ▼
            ┌─────────────┐
            │  CANCELLED  │
            └─────────────┘
              [TERMINAL]
              + Credits refunded
```

---

### 3. Review Status State Machine

```
        ┌─────────────┐
        │  SUBMITTED  │
        └──────┬──────┘
               │ User submits review
               │ after completed trip
               │
               ▼
        ┌─────────────┐
        │   PENDING   │◄───────────┐
        └──────┬──────┘            │
               │                   │
       ┌───────┴───────┐           │
       │               │           │
       │ Employee      │ Employee  │ Request
       │ approves      │ rejects   │ changes
       │               │           │
       ▼               ▼           │
┌─────────────┐ ┌─────────────┐   │
│  APPROVED   │ │  REJECTED   │───┘
└─────────────┘ └─────────────┘
 [TERMINAL]       [Can be revised]
 Visible to       Hidden from
 public           public
```

---

### 4. User Authentication State

```
        ┌─────────────┐
        │  VISITOR    │
        └──────┬──────┘
               │ Clicks "Register"
               │
               ▼
        ┌─────────────┐
        │ REGISTERING │
        └──────┬──────┘
               │ Form submitted
               │ Validation passed
               │
               ▼
        ┌─────────────┐
        │AUTHENTICATED│◄─────────────┐
        └──────┬──────┘              │
               │                     │
       ┌───────┴───────┐             │
       │               │             │ Clicks "Login"
       │ JWT valid     │ JWT expired │ Credentials valid
       │               │             │
       │               ▼             │
       │        ┌─────────────┐      │
       │        │   LOGGED    │      │
       │        │     OUT     │──────┘
       │        └─────────────┘
       │
       │ Account suspended
       │
       ▼
┌─────────────┐
│  SUSPENDED  │
└─────────────┘
 [BLOCKED]
 Cannot login
```

---

## Activity Diagrams

### Search and Book Carpool Flow

```
┌─────────────────────────────────────────────────────────┐
│                    SEARCH AND BOOK                      │
└─────────────────────────────────────────────────────────┘

    START
      │
      ▼
┌──────────────┐
│ Enter Search │
│  Criteria    │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ Submit Form  │
└──────┬───────┘
       │
       ▼
  ┌─────────┐     No      ┌──────────────┐
  │ Results?├────────────>│ Show "No     │
  │         │             │  carpools    │
  └────┬────┘             │  available"  │
       │ Yes              └──────┬───────┘
       │                         │
       ▼                         │
┌──────────────┐                 │
│ Apply Filters│                 │
└──────┬───────┘                 │
       │                         │
       ▼                         │
┌──────────────┐                 │
│ Browse List  │                 │
└──────┬───────┘                 │
       │                         │
       ▼                         │
┌──────────────┐                 │
│ Click Card   │                 │
└──────┬───────┘                 │
       │                         │
       ▼                         │
┌──────────────┐                 │
│ View Details │                 │
└──────┬───────┘                 │
       │                         │
       ▼                         │
  ┌─────────┐     No             │
  │Logged in├───────────┐        │
  │    ?    │           │        │
  └────┬────┘           ▼        │
       │ Yes    ┌──────────────┐ │
       │        │ Redirect to  │ │
       │        │   /login     │ │
       │        └──────────────┘ │
       ▼                         │
  ┌─────────┐     No             │
  │ Enough  ├────────────┐       │
  │ credits?│            │       │
  └────┬────┘            ▼       │
       │ Yes    ┌──────────────┐ │
       │        │ Show "Need   │ │
       │        │ more credits"│ │
       │        └──────────────┘ │
       ▼                         │
  ┌─────────┐     No             │
  │  Seats  ├────────────┐       │
  │available│            │       │
  └────┬────┘            ▼       │
       │ Yes    ┌──────────────┐ │
       │        │ Show "Full"  │ │
       │        └──────────────┘ │
       ▼                         │
┌──────────────┐                 │
│ Click "Book" │                 │
└──────┬───────┘                 │
       │                         │
       ▼                         │
┌──────────────┐                 │
│ Confirm Modal│                 │
└──────┬───────┘                 │
       │                         │
       ▼                         │
  ┌─────────┐     No             │
  │ Confirm?├────────────────────┤
  └────┬────┘                    │
       │ Yes                     │
       ▼                         │
┌──────────────┐                 │
│ Submit Booking                 │
└──────┬───────┘                 │
       │                         │
       ▼                         │
┌──────────────┐                 │
│ Show Success │                 │
│  + Send Email│                 │
└──────┬───────┘                 │
       │                         │
       ▼                         │
     END◄──────────────────────────
```

---

## Component Interaction Diagram

```
┌────────────────────────────────────────────────────────────┐
│                     FRONTEND LAYER                         │
├────────────────────────────────────────────────────────────┤
│                                                            │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐      │
│  │ Pages   │  │Components│ │Contexts │  │ Hooks   │      │
│  │         │  │          │  │         │  │         │      │
│  │ /carpools  │CarpoolCard│ AuthContext │useAuth  │      │
│  │ /login  │  │SearchBar │  │         │  │useCarpool     │
│  │ /profile│  │FilterPanel  │         │  │useBooking     │
│  └────┬────┘  └────┬─────┘  └────┬────┘  └────┬────┘      │
│       │            │             │            │           │
└───────┼────────────┼─────────────┼────────────┼───────────┘
        │            │             │            │
        └────────────┴─────────────┴────────────┘
                     │
        ┌────────────▼────────────┐
        │    API ROUTE LAYER      │
        ├─────────────────────────┤
        │                         │
        │  /api/auth/*            │
        │  /api/carpools/*        │
        │  /api/bookings/*        │
        │  /api/reviews/*         │
        │  /api/admin/*           │
        │                         │
        └────────┬────────────────┘
                 │
        ┌────────┴────────────┐
        │  MIDDLEWARE LAYER   │
        ├─────────────────────┤
        │                     │
        │  • JWT Verification │
        │  • Role Guards      │
        │  • Input Validation │
        │  • Error Handling   │
        │                     │
        └────────┬────────────┘
                 │
     ┌───────────┴──────────┐
     │                      │
     ▼                      ▼
┌─────────┐          ┌──────────┐
│ Prisma  │          │ MongoDB  │
│  ORM    │          │  Client  │
└────┬────┘          └────┬─────┘
     │                    │
     ▼                    ▼
┌──────────┐        ┌──────────┐
│PostgreSQL│        │ MongoDB  │
└──────────┘        └──────────┘
```

---

**Document Version**: 1.0.0  
**Last Updated**: February 2026  
**Tools**: Draw.io, Mermaid.js recommended for visual rendering  
**Standards**: UML 2.5, Industry best practices
