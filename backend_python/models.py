import uuid
from datetime import datetime
from typing import List, Optional
from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Float, Integer, Table
from sqlalchemy.orm import relationship
from database import Base

def generate_uuid():
    return str(uuid.uuid4())

class User(Base):
    __tablename__ = "User"

    id = Column(String, primary_key=True, default=generate_uuid)
    email = Column(String, unique=True, index=True, nullable=False)
    passwordHash = Column(String, nullable=False)
    role = Column(String, default="TENANT")  # MANAGER, TENANT, ADMIN
    isVerified = Column(Boolean, default=False)
    
    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deletedAt = Column(DateTime, nullable=True)

    profile = relationship("Profile", back_populates="user", uselist=False, cascade="all, delete-orphan")
    properties = relationship("Property", back_populates="manager")
    leases = relationship("Lease", back_populates="tenant")
    payments = relationship("Payment", back_populates="tenant")
    sentMessages = relationship("Message", foreign_keys="Message.senderId", back_populates="sender")
    receivedMessages = relationship("Message", foreign_keys="Message.receiverId", back_populates="receiver")
    notifications = relationship("Notification", back_populates="user")
    auditLogs = relationship("AuditLog", back_populates="user")

class Profile(Base):
    __tablename__ = "Profile"

    id = Column(String, primary_key=True, default=generate_uuid)
    userId = Column(String, ForeignKey("User.id", ondelete="CASCADE"), unique=True, nullable=False)
    firstName = Column(String, nullable=False)
    lastName = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    avatarUrl = Column(String, nullable=True)
    preferences = Column(String, nullable=True)  # JSON stringified

    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="profile")

class Property(Base):
    __tablename__ = "Property"

    id = Column(String, primary_key=True, default=generate_uuid)
    managerId = Column(String, ForeignKey("User.id", ondelete="RESTRICT"), nullable=False)
    name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    city = Column(String, nullable=False)
    state = Column(String, nullable=False)
    zipCode = Column(String, nullable=False)
    country = Column(String, default="USA")
    status = Column(String, default="ACTIVE")  # ACTIVE, INACTIVE, MAINTENANCE

    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deletedAt = Column(DateTime, nullable=True)

    manager = relationship("User", back_populates="properties")
    units = relationship("Unit", back_populates="property", cascade="all, delete-orphan")

class Unit(Base):
    __tablename__ = "Unit"

    id = Column(String, primary_key=True, default=generate_uuid)
    propertyId = Column(String, ForeignKey("Property.id", ondelete="CASCADE"), nullable=False)
    unitNumber = Column(String, nullable=False)
    bedrooms = Column(Integer, default=1)
    bathrooms = Column(Float, default=1.0)
    rentAmount = Column(Float, nullable=False)
    status = Column(String, default="VACANT")  # VACANT, OCCUPIED, MAINTENANCE

    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deletedAt = Column(DateTime, nullable=True)

    property = relationship("Property", back_populates="units")
    leases = relationship("Lease", back_populates="unit")

class Lease(Base):
    __tablename__ = "Lease"

    id = Column(String, primary_key=True, default=generate_uuid)
    unitId = Column(String, ForeignKey("Unit.id", ondelete="RESTRICT"), nullable=False)
    tenantId = Column(String, ForeignKey("User.id", ondelete="RESTRICT"), nullable=False)
    startDate = Column(DateTime, nullable=False)
    endDate = Column(DateTime, nullable=False)
    rentAmount = Column(Float, nullable=False)
    depositAmount = Column(Float, nullable=False)
    status = Column(String, default="PENDING")  # PENDING, ACTIVE, EXPIRED, TERMINATED
    documentUrl = Column(String, nullable=True)

    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    deletedAt = Column(DateTime, nullable=True)

    unit = relationship("Unit", back_populates="leases")
    tenant = relationship("User", back_populates="leases")
    payments = relationship("Payment", back_populates="lease")

class Payment(Base):
    __tablename__ = "Payment"

    id = Column(String, primary_key=True, default=generate_uuid)
    leaseId = Column(String, ForeignKey("Lease.id", ondelete="RESTRICT"), nullable=False)
    tenantId = Column(String, ForeignKey("User.id", ondelete="RESTRICT"), nullable=False)
    amount = Column(Float, nullable=False)
    status = Column(String, default="PENDING")  # PENDING, COMPLETED, OVERDUE, FAILED, REFUNDED
    dueDate = Column(DateTime, nullable=False)
    paidDate = Column(DateTime, nullable=True)
    paymentMethod = Column(String, nullable=True)
    referenceId = Column(String, nullable=True)

    createdAt = Column(DateTime, default=datetime.utcnow)
    updatedAt = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    lease = relationship("Lease", back_populates="payments")
    tenant = relationship("User", back_populates="payments")

class Message(Base):
    __tablename__ = "Message"

    id = Column(String, primary_key=True, default=generate_uuid)
    senderId = Column(String, ForeignKey("User.id", ondelete="CASCADE"), nullable=False)
    receiverId = Column(String, ForeignKey("User.id", ondelete="CASCADE"), nullable=False)
    content = Column(String, nullable=False)
    readAt = Column(DateTime, nullable=True)
    createdAt = Column(DateTime, default=datetime.utcnow)

    sender = relationship("User", foreign_keys=[senderId], back_populates="sentMessages")
    receiver = relationship("User", foreign_keys=[receiverId], back_populates="receivedMessages")

class Notification(Base):
    __tablename__ = "Notification"

    id = Column(String, primary_key=True, default=generate_uuid)
    userId = Column(String, ForeignKey("User.id", ondelete="CASCADE"), nullable=False)
    type = Column(String, nullable=False)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    readAt = Column(DateTime, nullable=True)
    linkUrl = Column(String, nullable=True)
    createdAt = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="notifications")

class AuditLog(Base):
    __tablename__ = "AuditLog"

    id = Column(String, primary_key=True, default=generate_uuid)
    userId = Column(String, ForeignKey("User.id", ondelete="SET NULL"), nullable=True)
    action = Column(String, nullable=False)
    entityType = Column(String, nullable=True)
    entityId = Column(String, nullable=True)
    meta_data = Column(String, nullable=True)  # JSON stringified
    ipAddress = Column(String, nullable=True)
    userAgent = Column(String, nullable=True)
    createdAt = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="auditLogs")
