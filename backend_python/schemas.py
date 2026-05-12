from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime

class ProfileBase(BaseModel):
    firstName: str
    lastName: str
    phone: Optional[str] = None
    avatarUrl: Optional[str] = None
    preferences: Optional[str] = None

class ProfileCreate(ProfileBase):
    pass

class Profile(ProfileBase):
    id: str
    userId: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True

class UserBase(BaseModel):
    email: EmailStr
    role: str = "TENANT"

class UserCreate(UserBase):
    password: str
    firstName: str
    lastName: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: str
    isVerified: bool
    createdAt: datetime
    updatedAt: datetime
    profile: Optional[Profile] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    token: str
    user: User

class PropertyBase(BaseModel):
    name: str
    address: str
    city: str
    state: str
    zipCode: str
    country: str = "USA"
    status: str = "ACTIVE"

class UnitBase(BaseModel):
    unitNumber: str
    bedrooms: int = 1
    bathrooms: float = 1.0
    rentAmount: float
    status: str = "VACANT"

class UnitCreate(UnitBase):
    pass

class PropertyCreate(PropertyBase):
    units: Optional[List[UnitCreate]] = None

class Unit(UnitBase):
    id: str
    propertyId: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True

class Property(PropertyBase):
    id: str
    managerId: str
    createdAt: datetime
    updatedAt: datetime
    units: List[Unit] = []

    class Config:
        from_attributes = True

class LeaseBase(BaseModel):
    unitId: str
    tenantId: str
    startDate: datetime
    endDate: datetime
    rentAmount: float
    depositAmount: float
    status: str = "PENDING"
    documentUrl: Optional[str] = None

class Lease(LeaseBase):
    id: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True

class PaymentBase(BaseModel):
    leaseId: str
    tenantId: str
    amount: float
    status: str = "PENDING"
    dueDate: datetime
    paidDate: Optional[datetime] = None
    paymentMethod: Optional[str] = None
    referenceId: Optional[str] = None

class Payment(PaymentBase):
    id: str
    createdAt: datetime
    updatedAt: datetime

    class Config:
        from_attributes = True

class MessageBase(BaseModel):
    receiverId: str
    content: str

class MessageCreate(MessageBase):
    pass

class Message(MessageBase):
    id: str
    senderId: str
    readAt: Optional[datetime] = None
    createdAt: datetime

    class Config:
        from_attributes = True

class Analytics(BaseModel):
    totalProperties: int
    totalUnits: int
    occupiedUnits: int
    vacantUnits: int
    occupancyRate: int
    totalTenants: int
    totalRevenue: float
    pendingPayments: int
    outstandingAmount: float
    monthlyRevenue: List[dict]
