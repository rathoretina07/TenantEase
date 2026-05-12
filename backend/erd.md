# TenantEase Entity Relationship Diagram (ERD)

Here is the visual representation of the PostgreSQL database schema we built. You can use this for your presentation or documentation.

```mermaid
erDiagram
    %% Core Users
    USER ||--o| PROFILE : "1 to 1"
    USER ||--o{ SESSION : "1 to Many"
    USER ||--o{ NOTIFICATION : "1 to Many"
    USER ||--o{ AUDIT_LOG : "1 to Many"
    
    %% Relationships
    USER ||--o{ PROPERTY : "1 to Many (Manager)"
    PROPERTY ||--|{ UNIT : "1 to Many"
    
    USER ||--o{ LEASE : "1 to Many (Tenant)"
    UNIT ||--o{ LEASE : "1 to Many"
    
    LEASE ||--o{ PAYMENT : "1 to Many"
    USER ||--o{ PAYMENT : "1 to Many (Tenant)"
    
    USER ||--o{ MESSAGE : "1 to Many (Sender/Receiver)"

    %% Tables
    USER {
        uuid id PK
        string email
        string passwordHash
        enum role "MANAGER, TENANT, ADMIN"
        boolean isVerified
    }

    PROFILE {
        uuid id PK
        uuid userId FK
        string firstName
        string lastName
        jsonb preferences
    }

    PROPERTY {
        uuid id PK
        uuid managerId FK
        string name
        string address
        enum status "ACTIVE, INACTIVE"
    }

    UNIT {
        uuid id PK
        uuid propertyId FK
        string unitNumber
        int bedrooms
        decimal rentAmount
        enum status "VACANT, OCCUPIED"
    }

    LEASE {
        uuid id PK
        uuid unitId FK
        uuid tenantId FK
        date startDate
        date endDate
        decimal rentAmount
        enum status "PENDING, ACTIVE, EXPIRED"
    }

    PAYMENT {
        uuid id PK
        uuid leaseId FK
        uuid tenantId FK
        decimal amount
        date dueDate
        date paidDate
        enum status "PENDING, COMPLETED, OVERDUE"
    }

    MESSAGE {
        uuid id PK
        uuid senderId FK
        uuid receiverId FK
        string content
        date readAt
    }
```

### Understanding the Relationships

1. **User Role Separation**: The `USER` table handles both Managers and Tenants. A Manager is linked to `PROPERTY`, while a Tenant is linked directly to a `LEASE`.
2. **Junction Table**: The `LEASE` table acts as a bridge connecting a `UNIT` to a `USER` (Tenant).
3. **Double Link**: The `PAYMENT` table is linked to both the `LEASE` and the `USER` (Tenant). This is an optimization choice so managers can easily pull all payments by a specific tenant without performing a complex JOIN through the lease table.
