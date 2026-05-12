-- ==============================================================================
-- POSTGRESQL INITIALIZATION & RLS (ROW LEVEL SECURITY) SETUP FOR SUPABASE
-- ==============================================================================
-- This script contains standard PostgreSQL CREATE statements along with
-- Supabase-specific Row-Level Security (RLS) policies.

-- Create ENUMs
CREATE TYPE "Role" AS ENUM ('MANAGER', 'TENANT', 'ADMIN');
CREATE TYPE "PropertyStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'MAINTENANCE');
CREATE TYPE "UnitStatus" AS ENUM ('VACANT', 'OCCUPIED', 'MAINTENANCE');
CREATE TYPE "LeaseStatus" AS ENUM ('PENDING', 'ACTIVE', 'EXPIRED', 'TERMINATED');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'OVERDUE', 'FAILED', 'REFUNDED');

-- Create User Table
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'TENANT',
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- Create Profile Table
CREATE TABLE "Profile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT,
    "avatarUrl" TEXT,
    "preferences" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Create Property Table
CREATE TABLE "Property" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "managerId" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "country" TEXT NOT NULL DEFAULT 'USA',
    "status" "PropertyStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),
    CONSTRAINT "Property_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "Property" ADD CONSTRAINT "Property_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- ==============================================================================
-- SUPABASE ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
-- RLS prevents tenants from seeing other tenants' data and ensures managers 
-- only see their own properties.

-- Enable RLS on core tables
ALTER TABLE "User" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Profile" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Property" ENABLE ROW LEVEL SECURITY;

-- 1. User Policies
-- Users can only see their own user record
CREATE POLICY "Users can view own record" ON "User"
    FOR SELECT USING (auth.uid() = id);

-- 2. Profile Policies
-- Users can view and update their own profile
CREATE POLICY "Users can view own profile" ON "Profile"
    FOR SELECT USING (auth.uid() = "userId");
CREATE POLICY "Users can update own profile" ON "Profile"
    FOR UPDATE USING (auth.uid() = "userId");

-- 3. Property Policies (Manager specific)
-- Managers can only view properties they own
CREATE POLICY "Managers view own properties" ON "Property"
    FOR SELECT USING (auth.uid() = "managerId");
-- Managers can insert properties
CREATE POLICY "Managers insert properties" ON "Property"
    FOR INSERT WITH CHECK (auth.uid() = "managerId" AND EXISTS (SELECT 1 FROM "User" WHERE id = auth.uid() AND role = 'MANAGER'));
-- Managers can update own properties
CREATE POLICY "Managers update own properties" ON "Property"
    FOR UPDATE USING (auth.uid() = "managerId");

-- Note: In a real Supabase setup with Prisma, you'll manage authentication through Supabase Auth (auth.users)
-- and link your public.User table via a trigger.
