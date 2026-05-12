from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import Optional

from app.database import get_db
from app.models import User, Profile, Lease, Unit, Property, Payment
from app.dependencies import require_role, AuthUser

router = APIRouter(prefix="/api/tenants", tags=["tenants"])


@router.get("/")
async def get_tenants(
    search: Optional[str] = None,
    user: AuthUser = Depends(require_role("MANAGER")),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(User)
        .where(User.role == "TENANT")
        .join(User.leases)
        .join(Lease.unit)
        .join(Unit.property)
        .where(Property.manager_id == user.id)
        .options(
            selectinload(User.profile),
            selectinload(User.leases)
            .selectinload(Lease.unit)
            .selectinload(Unit.property),
            selectinload(User.payments),
        )
    )
    if search:
        like = f"%{search}%"
        stmt = stmt.outerjoin(User.profile).where(
            (User.email.ilike(like))
            | (Profile.first_name.ilike(like))
            | (Profile.last_name.ilike(like))
        )

    result = await db.execute(stmt)
    tenants = result.scalars().unique().all()

    out = []
    for t in tenants:
        profile = None
        if t.profile:
            profile = {
                "id": t.profile.id,
                "firstName": t.profile.first_name,
                "lastName": t.profile.last_name,
                "phone": t.profile.phone,
                "avatarUrl": t.profile.avatar_url,
            }
        leases_out = []
        for lease in (t.leases or []):
            unit_out = None
            if lease.unit:
                prop_out = None
                if lease.unit.property:
                    prop_out = {"id": lease.unit.property.id, "name": lease.unit.property.name}
                unit_out = {"id": lease.unit.id, "unitNumber": lease.unit.unit_number, "property": prop_out}
            leases_out.append({
                "id": lease.id, "status": lease.status,
                "startDate": lease.start_date.isoformat() if lease.start_date else None,
                "endDate": lease.end_date.isoformat() if lease.end_date else None,
                "rentAmount": lease.rent_amount,
                "unit": unit_out,
            })

        out.append({
            "id": t.id,
            "email": t.email,
            "role": t.role,
            "profile": profile,
            "leases": leases_out,
            "payments": [
                {"id": p.id, "amount": p.amount, "status": p.status,
                 "dueDate": p.due_date.isoformat() if p.due_date else None}
                for p in sorted((t.payments or []), key=lambda x: x.due_date or x.created_at, reverse=True)[:5]
            ],
        })
    return out
