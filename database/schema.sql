-- ============================================
-- ECORIDE PLATFORM - DATABASE SCHEMA
-- PostgreSQL Database Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE "UserRole" AS ENUM ('PASSENGER', 'DRIVER', 'EMPLOYEE', 'ADMIN');
CREATE TYPE "CarpoolStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');
CREATE TYPE "VehicleEnergyType" AS ENUM ('ELECTRIC', 'HYBRID', 'GASOLINE', 'DIESEL');
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- ============================================
-- TABLES
-- ============================================

-- Users table
CREATE TABLE "users" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "email" TEXT NOT NULL UNIQUE,
    "pseudo" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'PASSENGER',
    "credits" INTEGER NOT NULL DEFAULT 20,
    "suspended" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Vehicles table
CREATE TABLE "vehicles" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "brand" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "energyType" "VehicleEnergyType" NOT NULL,
    "seats" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "vehicles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Carpools table
CREATE TABLE "carpools" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "departure" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "departureDate" TIMESTAMP(3) NOT NULL,
    "departureTime" TEXT NOT NULL,
    "arrivalTime" TEXT NOT NULL,
    "availableSeats" INTEGER NOT NULL,
    "pricePerSeat" INTEGER NOT NULL,
    "platformPrice" INTEGER NOT NULL,
    "status" "CarpoolStatus" NOT NULL DEFAULT 'PENDING',
    "driverId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "carpools_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "carpools_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Bookings table
CREATE TABLE "bookings" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "carpoolId" TEXT NOT NULL,
    "passengerId" TEXT NOT NULL,
    "seats" INTEGER NOT NULL DEFAULT 1,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "confirmed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "bookings_carpoolId_fkey" FOREIGN KEY ("carpoolId") REFERENCES "carpools"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "bookings_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Reviews table
CREATE TABLE "reviews" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING',
    "authorId" TEXT NOT NULL,
    "recipientId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "reviews_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "reviews_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Preferences table
CREATE TABLE "preferences" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "smokingAllowed" BOOLEAN NOT NULL DEFAULT false,
    "petsAllowed" BOOLEAN NOT NULL DEFAULT false,
    "musicAllowed" BOOLEAN NOT NULL DEFAULT true,
    "talkingAllowed" BOOLEAN NOT NULL DEFAULT true,
    "userId" TEXT NOT NULL UNIQUE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "preferences_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- ============================================
-- INDEXES for performance
-- ============================================

CREATE INDEX "users_email_idx" ON "users"("email");
CREATE INDEX "users_pseudo_idx" ON "users"("pseudo");
CREATE INDEX "vehicles_userId_idx" ON "vehicles"("userId");
CREATE INDEX "carpools_driverId_idx" ON "carpools"("driverId");
CREATE INDEX "carpools_vehicleId_idx" ON "carpools"("vehicleId");
CREATE INDEX "carpools_departureDate_idx" ON "carpools"("departureDate");
CREATE INDEX "carpools_status_idx" ON "carpools"("status");
CREATE INDEX "bookings_carpoolId_idx" ON "bookings"("carpoolId");
CREATE INDEX "bookings_passengerId_idx" ON "bookings"("passengerId");
CREATE INDEX "reviews_authorId_idx" ON "reviews"("authorId");
CREATE INDEX "reviews_recipientId_idx" ON "reviews"("recipientId");
CREATE INDEX "reviews_status_idx" ON "reviews"("status");
CREATE INDEX "preferences_userId_idx" ON "preferences"("userId");

-- ============================================
-- TRIGGERS for updatedAt
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON "users"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON "vehicles"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_carpools_updated_at BEFORE UPDATE ON "carpools"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON "bookings"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON "reviews"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_preferences_updated_at BEFORE UPDATE ON "preferences"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
