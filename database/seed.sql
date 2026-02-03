-- ============================================
-- ECORIDE PLATFORM - SEED DATA
-- Test Data for Development and Testing
-- ============================================

-- Note: Passwords are hashed with bcrypt
-- All test passwords: "Password123!"

-- ============================================
-- USERS
-- ============================================

-- Admin user
INSERT INTO "users" ("id", "email", "pseudo", "password", "role", "credits", "suspended")
VALUES 
('admin-001', 'admin@ecoride.com', 'Admin', '$2b$10$K7L.FRN/6gLzYWGjDlGqcOEGqXqj8GJ8fzDK2K7L.FRN/6gLzYWGj', 'ADMIN', 1000, false);

-- Employee user
INSERT INTO "users" ("id", "email", "pseudo", "password", "role", "credits", "suspended")
VALUES 
('employee-001', 'employee@ecoride.com', 'Employee', '$2b$10$K7L.FRN/6gLzYWGjDlGqcOEGqXqj8GJ8fzDK2K7L.FRN/6gLzYWGj', 'EMPLOYEE', 100, false);

-- Driver users
INSERT INTO "users" ("id", "email", "pseudo", "password", "role", "credits", "suspended")
VALUES 
('driver-001', 'driver@ecoride.com', 'JeanDriver', '$2b$10$K7L.FRN/6gLzYWGjDlGqcOEGqXqj8GJ8fzDK2K7L.FRN/6gLzYWGj', 'DRIVER', 50, false),
('driver-002', 'marie.eco@ecoride.com', 'MarieEco', '$2b$10$K7L.FRN/6gLzYWGjDlGqcOEGqXqj8GJ8fzDK2K7L.FRN/6gLzYWGj', 'DRIVER', 75, false),
('driver-003', 'paul.green@ecoride.com', 'PaulGreen', '$2b$10$K7L.FRN/6gLzYWGjDlGqcOEGqXqj8GJ8fzDK2K7L.FRN/6gLzYWGj', 'DRIVER', 60, false);

-- Passenger users
INSERT INTO "users" ("id", "email", "pseudo", "password", "role", "credits", "suspended")
VALUES 
('passenger-001', 'passenger@ecoride.com', 'Passenger1', '$2b$10$K7L.FRN/6gLzYWGjDlGqcOEGqXqj8GJ8fzDK2K7L.FRN/6gLzYWGj', 'PASSENGER', 20, false),
('passenger-002', 'lucie.voyage@ecoride.com', 'LucieVoyage', '$2b$10$K7L.FRN/6gLzYWGjDlGqcOEGqXqj8GJ8fzDK2K7L.FRN/6gLzYWGj', 'PASSENGER', 25, false),
('passenger-003', 'tom.travel@ecoride.com', 'TomTravel', '$2b$10$K7L.FRN/6gLzYWGjDlGqcOEGqXqj8GJ8fzDK2K7L.FRN/6gLzYWGj', 'PASSENGER', 30, false);

-- ============================================
-- VEHICLES
-- ============================================

INSERT INTO "vehicles" ("id", "brand", "model", "energyType", "seats", "userId")
VALUES 
('vehicle-001', 'Tesla', 'Model 3', 'ELECTRIC', 4, 'driver-001'),
('vehicle-002', 'Toyota', 'Prius', 'HYBRID', 4, 'driver-002'),
('vehicle-003', 'Renault', 'Zoe', 'ELECTRIC', 4, 'driver-003'),
('vehicle-004', 'Peugeot', '308', 'HYBRID', 5, 'driver-001');

-- ============================================
-- PREFERENCES
-- ============================================

INSERT INTO "preferences" ("id", "smokingAllowed", "petsAllowed", "musicAllowed", "talkingAllowed", "userId")
VALUES 
('pref-001', false, true, true, true, 'driver-001'),
('pref-002', false, false, true, true, 'driver-002'),
('pref-003', false, true, false, false, 'driver-003');

-- ============================================
-- CARPOOLS
-- ============================================

-- Future carpools (available for booking)
INSERT INTO "carpools" ("id", "departure", "destination", "departureDate", "departureTime", "arrivalTime", "availableSeats", "pricePerSeat", "platformPrice", "status", "driverId", "vehicleId")
VALUES 
-- Paris to Lyon trips
('carpool-001', 'Paris', 'Lyon', '2026-02-10 08:00:00', '08:00', '12:00', 3, 25, 27, 'PENDING', 'driver-001', 'vehicle-001'),
('carpool-002', 'Paris', 'Lyon', '2026-02-12 09:00:00', '09:00', '13:00', 2, 30, 32, 'PENDING', 'driver-002', 'vehicle-002'),
('carpool-003', 'Paris', 'Lyon', '2026-02-15 07:30:00', '07:30', '11:30', 4, 22, 24, 'PENDING', 'driver-003', 'vehicle-003'),

-- Paris to Marseille trips
('carpool-004', 'Paris', 'Marseille', '2026-02-11 06:00:00', '06:00', '14:00', 3, 45, 47, 'PENDING', 'driver-001', 'vehicle-004'),
('carpool-005', 'Paris', 'Marseille', '2026-02-14 07:00:00', '07:00', '15:00', 2, 50, 52, 'PENDING', 'driver-002', 'vehicle-002'),

-- Lyon to Marseille trips
('carpool-006', 'Lyon', 'Marseille', '2026-02-13 10:00:00', '10:00', '13:00', 3, 20, 22, 'PENDING', 'driver-003', 'vehicle-003'),

-- Bordeaux to Paris trips
('carpool-007', 'Bordeaux', 'Paris', '2026-02-16 08:00:00', '08:00', '14:00', 4, 35, 37, 'PENDING', 'driver-001', 'vehicle-001'),

-- Past completed carpools (for history)
('carpool-008', 'Paris', 'Lyon', '2026-01-20 08:00:00', '08:00', '12:00', 0, 25, 27, 'COMPLETED', 'driver-001', 'vehicle-001'),
('carpool-009', 'Lyon', 'Paris', '2026-01-22 15:00:00', '15:00', '19:00', 0, 28, 30, 'COMPLETED', 'driver-002', 'vehicle-002');

-- ============================================
-- BOOKINGS
-- ============================================

-- Active bookings
INSERT INTO "bookings" ("id", "carpoolId", "passengerId", "seats", "status", "confirmed")
VALUES 
('booking-001', 'carpool-001', 'passenger-001', 1, 'CONFIRMED', false),
('booking-002', 'carpool-002', 'passenger-002', 2, 'CONFIRMED', false),
('booking-003', 'carpool-004', 'passenger-003', 1, 'CONFIRMED', false);

-- Past bookings (completed trips)
INSERT INTO "bookings" ("id", "carpoolId", "passengerId", "seats", "status", "confirmed")
VALUES 
('booking-004', 'carpool-008', 'passenger-001', 1, 'CONFIRMED', true),
('booking-005', 'carpool-008', 'passenger-002', 2, 'CONFIRMED', true),
('booking-006', 'carpool-009', 'passenger-003', 1, 'CONFIRMED', true);

-- ============================================
-- REVIEWS
-- ============================================

-- Approved reviews
INSERT INTO "reviews" ("id", "rating", "comment", "status", "authorId", "recipientId")
VALUES 
('review-001', 5, 'Excellent conducteur, très ponctuel et véhicule propre !', 'APPROVED', 'passenger-001', 'driver-001'),
('review-002', 4, 'Bon trajet, musique un peu forte mais agréable.', 'APPROVED', 'passenger-002', 'driver-001'),
('review-003', 5, 'Super expérience, très écologique avec la voiture électrique !', 'APPROVED', 'passenger-003', 'driver-002'),
('review-004', 4, 'Bonne conduite, respect des horaires.', 'APPROVED', 'passenger-001', 'driver-002');

-- Pending reviews (waiting for employee validation)
INSERT INTO "reviews" ("id", "rating", "comment", "status", "authorId", "recipientId")
VALUES 
('review-005', 3, 'Trajet correct mais retard de 15 minutes au départ.', 'PENDING', 'passenger-002', 'driver-003'),
('review-006', 2, 'Conduite un peu sportive, pas très à l''aise.', 'PENDING', 'passenger-003', 'driver-003');

-- ============================================
-- Summary
-- ============================================
-- Users created: 8 (1 admin, 1 employee, 3 drivers, 3 passengers)
-- Vehicles created: 4 (2 electric, 2 hybrid)
-- Carpools created: 9 (7 future, 2 past)
-- Bookings created: 6
-- Reviews created: 6 (4 approved, 2 pending)
-- Test password for all accounts: Password123!
