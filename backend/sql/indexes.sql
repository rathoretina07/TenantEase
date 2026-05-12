-- ==============================================================================
-- POSTGRESQL QUERY OPTIMIZATION & INDEXES
-- ==============================================================================
-- This script contains B-Tree, Composite, and JSONB GIN indexes designed
-- to speed up the most frequent read operations in the TenantEase app.

-- 1. Authentication & Session Lookups
-- Speeds up token validation middleware
CREATE INDEX idx_session_token ON "Session"("sessionToken");
CREATE INDEX idx_refresh_token ON "RefreshToken"("token");
CREATE INDEX idx_user_email ON "User"("email");

-- 2. Dashboard Analytics Lookups (Composite Indexes)
-- Managers frequently query properties by status and creation date
CREATE INDEX idx_property_manager_status ON "Property"("managerId", "status");

-- Tenants and Managers frequently query payments by lease, status, and due date
CREATE INDEX idx_payment_lease_status ON "Payment"("leaseId", "status");
CREATE INDEX idx_payment_tenant_status ON "Payment"("tenantId", "status");
CREATE INDEX idx_payment_due_date ON "Payment"("dueDate" DESC);

-- Leases by property/unit and status
CREATE INDEX idx_lease_tenant_status ON "Lease"("tenantId", "status");
CREATE INDEX idx_lease_unit_status ON "Lease"("unitId", "status");

-- 3. Messaging Performance
-- Speeds up loading conversation histories between two users
CREATE INDEX idx_messages_conversation ON "Message"("senderId", "receiverId", "createdAt" DESC);
-- Speeds up unread message counters
CREATE INDEX idx_messages_unread ON "Message"("receiverId") WHERE "readAt" IS NULL;

-- 4. JSONB Indexing for Audits and Preferences
-- GIN (Generalized Inverted Index) for querying keys inside JSONB columns
CREATE INDEX idx_audit_metadata ON "AuditLog" USING GIN ("metadata");
CREATE INDEX idx_profile_preferences ON "Profile" USING GIN ("preferences");

-- 5. Soft Delete Filtering
-- Partial indexes to dramatically speed up queries that exclude deleted records
CREATE INDEX idx_property_active ON "Property"("managerId") WHERE "deletedAt" IS NULL;
CREATE INDEX idx_lease_active ON "Lease"("tenantId") WHERE "deletedAt" IS NULL;
