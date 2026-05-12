from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import Optional
from datetime import datetime

from app.database import get_db
from app.models import Payment, Lease, Unit, Property, User, Profile
from app.dependencies import require_role, get_current_user, AuthUser

router = APIRouter(prefix="/api/payments", tags=["payments"])


# ── Helpers ────────────────────────────────────────────────────────────────
def _payment_dict(p: Payment) -> dict:
    tenant_profile = None
    if p.tenant and p.tenant.profile:
        pr = p.tenant.profile
        tenant_profile = {"firstName": pr.first_name, "lastName": pr.last_name}

    lease_out = None
    if p.lease:
        unit_out = None
        if p.lease.unit:
            prop_out = None
            if p.lease.unit.property:
                prop_out = {"id": p.lease.unit.property.id, "name": p.lease.unit.property.name, "managerId": p.lease.unit.property.manager_id}
            unit_out = {"id": p.lease.unit.id, "unitNumber": p.lease.unit.unit_number, "property": prop_out}
        lease_out = {"id": p.lease.id, "unit": unit_out}

    return {
        "id": p.id, "amount": p.amount, "status": p.status,
        "dueDate": p.due_date.isoformat() if p.due_date else None,
        "paidDate": p.paid_date.isoformat() if p.paid_date else None,
        "paymentMethod": p.payment_method,
        "createdAt": p.created_at.isoformat() if p.created_at else None,
        "tenant": {"id": p.tenant.id, "email": p.tenant.email, "profile": tenant_profile} if p.tenant else None,
        "lease": lease_out,
    }


# ── Routes ─────────────────────────────────────────────────────────────────
@router.get("/")
async def get_payments(
    user: AuthUser = Depends(require_role("MANAGER")),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(Payment)
        .join(Payment.lease)
        .join(Lease.unit)
        .join(Unit.property)
        .where(Property.manager_id == user.id)
        .options(
            selectinload(Payment.tenant).selectinload(User.profile),
            selectinload(Payment.lease)
            .selectinload(Lease.unit)
            .selectinload(Unit.property),
        )
        .order_by(Payment.due_date.desc())
    )
    result = await db.execute(stmt)
    payments = result.scalars().unique().all()
    return [_payment_dict(p) for p in payments]


@router.get("/my")
async def get_my_payments(
    user: AuthUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(Payment)
        .where(Payment.tenant_id == user.id)
        .options(
            selectinload(Payment.lease)
            .selectinload(Lease.unit)
            .selectinload(Unit.property),
        )
        .order_by(Payment.due_date.desc())
    )
    result = await db.execute(stmt)
    payments = result.scalars().unique().all()
    return [_payment_dict(p) for p in payments]


class PayBody(BaseModel):
    paymentMethod: Optional[str] = "BANK_TRANSFER"


@router.post("/{payment_id}/pay")
async def make_payment(
    payment_id: str,
    body: PayBody,
    user: AuthUser = Depends(require_role("TENANT")),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Payment)
        .where(Payment.id == payment_id, Payment.tenant_id == user.id)
        .options(
            selectinload(Payment.lease)
            .selectinload(Lease.unit)
            .selectinload(Unit.property),
            selectinload(Payment.tenant).selectinload(User.profile),
        )
    )
    payment = result.scalar_one_or_none()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment not found")
    if payment.status == "COMPLETED":
        raise HTTPException(status_code=400, detail="Payment already completed")

    payment.status = "COMPLETED"
    payment.paid_date = datetime.utcnow()
    payment.payment_method = body.paymentMethod
    await db.commit()
    await db.refresh(payment)
    return _payment_dict(payment)
