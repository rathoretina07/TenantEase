import uuid
from datetime import datetime
from sqlalchemy import (
    Column, String, Boolean, DateTime, Float, Integer, ForeignKey, Text, Index
)
from sqlalchemy.orm import relationship, DeclarativeBase


def _uuid() -> str:
    return str(uuid.uuid4())


class Base(DeclarativeBase):
    pass


# ---------------------------------------------------------------------------
# AUTH & USERS
# ---------------------------------------------------------------------------

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=_uuid)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    role = Column(String, default="TENANT", index=True)  # MANAGER | TENANT | ADMIN
    is_verified = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

    # Relationships
    profile = relationship("Profile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    sessions = relationship("Session", back_populates="user", cascade="all, delete-orphan")
    refresh_tokens = relationship("RefreshToken", back_populates="user", cascade="all, delete-orphan")
    properties = relationship("Property", back_populates="manager", foreign_keys="Property.manager_id")
    leases = relationship("Lease", back_populates="tenant", foreign_keys="Lease.tenant_id")
    payments = relationship("Payment", back_populates="tenant", foreign_keys="Payment.tenant_id")
    sent_messages = relationship("Message", back_populates="sender", foreign_keys="Message.sender_id")
    recv_messages = relationship("Message", back_populates="receiver", foreign_keys="Message.receiver_id")
    notifications = relationship("Notification", back_populates="user", cascade="all, delete-orphan")
    audit_logs = relationship("AuditLog", back_populates="user")


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(String, primary_key=True, default=_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), unique=True, nullable=False)

    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    avatar_url = Column(String, nullable=True)
    preferences = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="profile")


class Session(Base):
    __tablename__ = "sessions"

    id = Column(String, primary_key=True, default=_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    session_token = Column(String, unique=True, nullable=False)
    expires_at = Column(DateTime, nullable=False)
    ip_address = Column(String, nullable=True)
    user_agent = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="sessions")


class RefreshToken(Base):
    __tablename__ = "refresh_tokens"

    id = Column(String, primary_key=True, default=_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    token = Column(String, unique=True, nullable=False)
    expires_at = Column(DateTime, nullable=False)
    revoked_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="refresh_tokens")


class VerificationToken(Base):
    __tablename__ = "verification_tokens"

    id = Column(String, primary_key=True, default=_uuid)
    identifier = Column(String, nullable=False)
    token = Column(String, unique=True, nullable=False)
    expires_at = Column(DateTime, nullable=False)


# ---------------------------------------------------------------------------
# PROPERTY MANAGEMENT
# ---------------------------------------------------------------------------

class Property(Base):
    __tablename__ = "properties"

    id = Column(String, primary_key=True, default=_uuid)
    manager_id = Column(String, ForeignKey("users.id", ondelete="RESTRICT"), nullable=False, index=True)

    name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    zip_code = Column(String, nullable=False)
    country = Column(String, default="USA")
    status = Column(String, default="ACTIVE")  # ACTIVE | INACTIVE | MAINTENANCE

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

    manager = relationship("User", back_populates="properties", foreign_keys=[manager_id])
    units = relationship("Unit", back_populates="property", cascade="all, delete-orphan")


class Unit(Base):
    __tablename__ = "units"

    id = Column(String, primary_key=True, default=_uuid)
    property_id = Column(String, ForeignKey("properties.id", ondelete="CASCADE"), nullable=False, index=True)

    unit_number = Column(String, nullable=False)
    bedrooms = Column(Integer, default=1)
    bathrooms = Column(Float, default=1.0)
    rent_amount = Column(Float, nullable=False)
    status = Column(String, default="VACANT")  # VACANT | OCCUPIED | MAINTENANCE

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

    property = relationship("Property", back_populates="units")
    leases = relationship("Lease", back_populates="unit")


# ---------------------------------------------------------------------------
# LEASING & PAYMENTS
# ---------------------------------------------------------------------------

class Lease(Base):
    __tablename__ = "leases"

    id = Column(String, primary_key=True, default=_uuid)
    unit_id = Column(String, ForeignKey("units.id", ondelete="RESTRICT"), nullable=False, index=True)
    tenant_id = Column(String, ForeignKey("users.id", ondelete="RESTRICT"), nullable=False, index=True)

    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    rent_amount = Column(Float, nullable=False)
    deposit_amount = Column(Float, nullable=False)
    status = Column(String, default="PENDING")  # PENDING | ACTIVE | EXPIRED | TERMINATED
    document_url = Column(String, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deleted_at = Column(DateTime, nullable=True)

    unit = relationship("Unit", back_populates="leases")
    tenant = relationship("User", back_populates="leases", foreign_keys=[tenant_id])
    payments = relationship("Payment", back_populates="lease")


class Payment(Base):
    __tablename__ = "payments"

    id = Column(String, primary_key=True, default=_uuid)
    lease_id = Column(String, ForeignKey("leases.id", ondelete="RESTRICT"), nullable=False, index=True)
    tenant_id = Column(String, ForeignKey("users.id", ondelete="RESTRICT"), nullable=False, index=True)

    amount = Column(Float, nullable=False)
    status = Column(String, default="PENDING")  # PENDING | COMPLETED | OVERDUE | FAILED | REFUNDED
    due_date = Column(DateTime, nullable=False)
    paid_date = Column(DateTime, nullable=True)
    payment_method = Column(String, nullable=True)
    reference_id = Column(String, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    __table_args__ = (Index("ix_payments_status", "status"),)

    lease = relationship("Lease", back_populates="payments")
    tenant = relationship("User", back_populates="payments", foreign_keys=[tenant_id])


# ---------------------------------------------------------------------------
# COMMUNICATION & LOGGING
# ---------------------------------------------------------------------------

class Message(Base):
    __tablename__ = "messages"

    id = Column(String, primary_key=True, default=_uuid)
    sender_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    receiver_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    content = Column(Text, nullable=False)
    read_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    sender = relationship("User", back_populates="sent_messages", foreign_keys=[sender_id])
    receiver = relationship("User", back_populates="recv_messages", foreign_keys=[receiver_id])


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(String, primary_key=True, default=_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True)
    type = Column(String, nullable=False)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    read_at = Column(DateTime, nullable=True)
    link_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="notifications")


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(String, primary_key=True, default=_uuid)
    user_id = Column(String, ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True)
    action = Column(String, nullable=False, index=True)
    entity_type = Column(String, nullable=True)
    entity_id = Column(String, nullable=True)
    metadata_ = Column("metadata", Text, nullable=True)
    ip_address = Column(String, nullable=True)
    user_agent = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="audit_logs")
