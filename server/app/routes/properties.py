from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from typing import Optional

from app.database import get_db
from app.models import Property, Unit, Lease, User, Profile
from app.dependencies import require_role, AuthUser

router = APIRouter(prefix="/api/properties", tags=["properties"])


# ── Schemas ────────────────────────────────────────────────────────────────
class UnitCreate(BaseModel):
    unitNumber: str
    bedrooms: int = 1
    bathrooms: float = 1.0
    rentAmount: float
    status: str = "VACANT"


class PropertyCreate(BaseModel):
    name: str
    address: str
    city: str
    state: str
    zipCode: str
    country: str = "USA"
    units: Optional[list[UnitCreate]] = None


# ── Helpers ────────────────────────────────────────────────────────────────
def _unit_dict(u: Unit) -> dict:
    leases_out = []
    for lease in (u.leases or []):
        if lease.status == "ACTIVE":
            tenant_profile = None
            if lease.tenant and lease.tenant.profile:
                p = lease.tenant.profile
                tenant_profile = {"firstName": p.first_name, "lastName": p.last_name, "phone": p.phone, "avatarUrl": p.avatar_url}
            leases_out.append({
                "id": lease.id, "status": lease.status,
                "startDate": lease.start_date.isoformat() if lease.start_date else None,
                "endDate": lease.end_date.isoformat() if lease.end_date else None,
                "rentAmount": lease.rent_amount,
                "tenant": {"id": lease.tenant.id, "email": lease.tenant.email, "profile": tenant_profile} if lease.tenant else None,
            })
    return {
        "id": u.id, "unitNumber": u.unit_number, "bedrooms": u.bedrooms,
        "bathrooms": u.bathrooms, "rentAmount": u.rent_amount, "status": u.status,
        "leases": leases_out,
    }


def _prop_dict(p: Property) -> dict:
    return {
        "id": p.id, "name": p.name, "address": p.address,
        "city": p.city, "state": p.state, "zipCode": p.zip_code,
        "country": p.country, "status": p.status,
        "createdAt": p.created_at.isoformat() if p.created_at else None,
        "units": [_unit_dict(u) for u in (p.units or [])],
    }


# ── Routes ─────────────────────────────────────────────────────────────────
@router.get("/")
async def get_properties(
    search: Optional[str] = None,
    user: AuthUser = Depends(require_role("MANAGER")),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(Property)
        .where(Property.manager_id == user.id, Property.deleted_at.is_(None))
        .options(
            selectinload(Property.units)
            .selectinload(Unit.leases)
            .selectinload(Lease.tenant)
            .selectinload(User.profile)
        )
        .order_by(Property.created_at.desc())
    )
    if search:
        like = f"%{search}%"
        stmt = stmt.where(
            (Property.name.ilike(like)) | (Property.address.ilike(like)) | (Property.city.ilike(like))
        )
    result = await db.execute(stmt)
    props = result.scalars().unique().all()
    return [_prop_dict(p) for p in props]


@router.post("/", status_code=201)
async def create_property(
    body: PropertyCreate,
    user: AuthUser = Depends(require_role("MANAGER")),
    db: AsyncSession = Depends(get_db),
):
    prop = Property(
        manager_id=user.id,
        name=body.name,
        address=body.address,
        city=body.city,
        state=body.state,
        zip_code=body.zipCode,
        country=body.country,
    )
    db.add(prop)
    await db.flush()

    if body.units:
        for u in body.units:
            unit = Unit(
                property_id=prop.id,
                unit_number=u.unitNumber,
                bedrooms=u.bedrooms,
                bathrooms=u.bathrooms,
                rent_amount=u.rentAmount,
                status=u.status,
            )
            db.add(unit)

    await db.commit()
    await db.refresh(prop, ["units"])
    return _prop_dict(prop)


@router.get("/{property_id}")
async def get_property_by_id(
    property_id: str,
    user: AuthUser = Depends(require_role("MANAGER")),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(Property)
        .where(Property.id == property_id, Property.manager_id == user.id, Property.deleted_at.is_(None))
        .options(selectinload(Property.units))
    )
    prop = result.scalar_one_or_none()
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")
    return _prop_dict(prop)
