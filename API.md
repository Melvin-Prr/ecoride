# 📚 API Documentation - EcoRide Platform

Base URL: `http://localhost:3000/api`

## 🔐 Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### POST `/auth/register`
Create a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "pseudo": "Username",
  "password": "Password123!"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "cuid",
      "email": "user@example.com",
      "pseudo": "Username",
      "role": "PASSENGER",
      "credits": 20,
      "createdAt": "2026-02-17T..."
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### POST `/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### GET `/auth/me` 🔒
Get current authenticated user information.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "cuid",
    "email": "user@example.com",
    "pseudo": "Username",
    "role": "PASSENGER",
    "credits": 20,
    "vehicles": [],
    "preferences": null
  }
}
```

---

## 🚗 Carpools

### GET `/carpools/search`
Search for carpools with filters.

**Query Parameters:**
- `from` (string, optional): Departure city
- `to` (string, optional): Destination city  
- `date` (string, optional): Departure date (YYYY-MM-DD)

**Response (200):**
```json
{
  "success": true,
  "data": {
    "carpools": [
      {
        "id": "cuid",
        "departure": "Paris",
        "destination": "Lyon",
        "departureDate": "2026-02-20T00:00:00.000Z",
        "departureTime": "09:00",
        "arrivalTime": "13:30",
        "availableSeats": 3,
        "platformPrice": 32,
        "driver": {
          "pseudo": "JeanDriver",
          "rating": 4.8
        },
        "vehicle": {
          "energyType": "ELECTRIC"
        }
      }
    ],
    "count": 1
  }
}
```

### GET `/carpools/:id`
Get detailed information about a specific carpool.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "cuid",
    "departure": "Paris, 75001",
    "destination": "Lyon, 69001",
    "departureDate": "2026-02-20T00:00:00.000Z",
    "departureTime": "09:00",
    "arrivalTime": "13:30",
    "availableSeats": 3,
    "pricePerSeat": 30,
    "platformPrice": 32,
    "status": "PENDING",
    "driver": {
      "pseudo": "JeanDriver",
      "rating": 4.8,
      "totalTrips": 45
    },
    "vehicle": {
      "brand": "Tesla",
      "model": "Model 3",
      "energyType": "ELECTRIC",
      "seats": 4
    },
    "preferences": {
      "smokingAllowed": false,
      "petsAllowed": true,
      "musicAllowed": true,
      "talkingAllowed": true
    },
    "reviews": [
      {
        "id": "cuid",
        "author": "Marie89",
        "rating": 5,
        "comment": "Excellent conducteur!",
        "createdAt": "2026-02-10T..."
      }
    ]
  }
}
```

### POST `/carpools` 🔒
Create a new carpool (driver only).

**Request Body:**
```json
{
  "departure": "Paris, France",
  "destination": "Lyon, France",
  "departureDate": "2026-02-25",
  "departureTime": "14:00",
  "arrivalTime": "18:30",
  "availableSeats": 3,
  "pricePerSeat": 30,
  "vehicleId": "vehicle-cuid"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "cuid",
    "departure": "Paris, France",
    "destination": "Lyon, France",
    "platformPrice": 32,
    ...
  }
}
```

---

## 📝 Bookings

### POST `/bookings` 🔒
Create a new booking for a carpool.

**Request Body:**
```json
{
  "carpoolId": "carpool-cuid",
  "seats": 1
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "booking": {
      "id": "cuid",
      "carpoolId": "carpool-cuid",
      "seats": 1,
      "status": "CONFIRMED",
      "createdAt": "2026-02-17T..."
    },
    "message": "Réservation confirmée !",
    "creditsUsed": 32
  }
}
```

**Validation:**
- User must have enough credits
- Carpool must have available seats
- User cannot book their own carpool
- User cannot have duplicate bookings

### DELETE `/bookings/:id` 🔒
Cancel a booking and refund credits.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "message": "Réservation annulée avec succès",
    "creditsRefunded": 32
  }
}
```

---

## 👤 Users

### GET `/users/profile` 🔒
Get user profile with booking and carpool history.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "bookings": [
      {
        "id": "cuid",
        "status": "CONFIRMED",
        "carpool": { ... },
        "createdAt": "2026-02-17T..."
      }
    ],
    "carpools": [
      {
        "id": "cuid",
        "departure": "Paris",
        "destination": "Lyon",
        "bookings": [ ... ]
      }
    ]
  }
}
```

### PUT `/users/profile` 🔒
Update user profile (change role to DRIVER).

**Request Body:**
```json
{
  "role": "DRIVER"
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "cuid",
    "email": "user@example.com",
    "pseudo": "Username",
    "role": "DRIVER",
    "credits": 20
  }
}
```

### GET `/users/vehicles` 🔒
Get user's vehicles.

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "cuid",
      "brand": "Tesla",
      "model": "Model 3",
      "energyType": "ELECTRIC",
      "seats": 4,
      "createdAt": "2026-02-17T..."
    }
  ]
}
```

### POST `/users/vehicles` 🔒
Add a new vehicle.

**Request Body:**
```json
{
  "brand": "Tesla",
  "model": "Model 3",
  "energyType": "ELECTRIC",
  "seats": 4
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "cuid",
    "brand": "Tesla",
    "model": "Model 3",
    "energyType": "ELECTRIC",
    "seats": 4
  }
}
```

**Energy Types:**
- `ELECTRIC`
- `HYBRID`
- `GASOLINE`
- `DIESEL`

### GET `/users/preferences` 🔒
Get user's driver preferences.

**Response (200):**
```json
{
  "success": true,
  "data": {
    "smokingAllowed": false,
    "petsAllowed": true,
    "musicAllowed": true,
    "talkingAllowed": true
  }
}
```

### PUT `/users/preferences` 🔒
Update driver preferences.

**Request Body:**
```json
{
  "smokingAllowed": false,
  "petsAllowed": true,
  "musicAllowed": true,
  "talkingAllowed": true
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "cuid",
    "smokingAllowed": false,
    "petsAllowed": true,
    "musicAllowed": true,
    "talkingAllowed": true,
    "userId": "user-cuid"
  }
}
```

---

## 🔒 Protected Routes

Routes marked with 🔒 require authentication.

**Authentication Header:**
```
Authorization: Bearer <your-jwt-token>
```

**Error Response (401):**
```json
{
  "success": false,
  "error": "Non autorisé"
}
```

---

## ⚠️ Error Responses

### Validation Error (422)
```json
{
  "success": false,
  "errors": {
    "email": "Email invalide",
    "password": "Le mot de passe doit contenir au moins 8 caractères"
  }
}
```

### General Error (400/500)
```json
{
  "success": false,
  "error": "Message d'erreur"
}
```

### Not Found (404)
```json
{
  "success": false,
  "error": "Ressource non trouvée"
}
```

---

## 🧪 Test Accounts

Use these accounts for testing:

**Admin:**
- Email: `admin@ecoride.com`
- Password: `Password123!`
- Credits: 1000

**Employee:**
- Email: `employee@ecoride.com`
- Password: `Password123!`
- Credits: 100

**Driver:**
- Email: `driver@ecoride.com`
- Password: `Password123!`
- Credits: 50

**Passenger:**
- Email: `passenger@ecoride.com`
- Password: `Password123!`
- Credits: 20

---

## 📊 Response Format

All API responses follow this format:

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```
