from datetime import datetime, timedelta
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, case, and_

from app.database import get_db
from app.models import Property, Unit, Lease, Payment, User
from app.dependencies import require_role, AuthUser

router = APIRouter(prefix="/api/analytics", tags=["analytics"])


@router.get("/")
async def get_analytics(
    user: AuthUser = Depends(require_role("MANAGER")),
    db: AsyncSession = Depends(get_db),
):
    manager_id = user.id

    # ── Aggregate counts ───────────────────────────────────────────────────
    total_properties = (await db.execute(
        select(func.count(Property.id)).where(Property.manager_id == manager_id, Property.deleted_at.is_(None))
    )).scalar() or 0

    total_units = (await db.execute(
        select(func.count(Unit.id))
        .join(Unit.property)
        .where(Property.manager_id == manager_id, Unit.deleted_at.is_(None))
    )).scalar() or 0

    occupied_units = (await db.execute(
        select(func.count(Unit.id))
        .join(Unit.property)
        .where(Property.manager_id == manager_id, Unit.status == "OCCUPIED", Unit.deleted_at.is_(None))
    )).scalar() or 0

    total_tenants = (await db.execute(
        select(func.count(func.distinct(User.id)))
        .join(Lease, Lease.tenant_id == User.id)
        .join(Unit, Lease.unit_id == Unit.id)
        .join(Property, Unit.property_id == Property.id)
        .where(User.role == "TENANT", Lease.status == "ACTIVE", Property.manager_id == manager_id)
    )).scalar() or 0

    total_revenue = (await db.execute(
        select(func.coalesce(func.sum(Payment.amount), 0))
        .join(Lease, Payment.lease_id == Lease.id)
        .join(Unit, Lease.unit_id == Unit.id)
        .join(Property, Unit.property_id == Property.id)
        .where(Payment.status == "COMPLETED", Property.manager_id == manager_id)
    )).scalar() or 0

    pending_payments = (await db.execute(
        select(func.count(Payment.id))
        .join(Lease, Payment.lease_id == Lease.id)
        .join(Unit, Lease.unit_id == Unit.id)
        .join(Property, Unit.property_id == Property.id)
        .where(Payment.status == "PENDING", Property.manager_id == manager_id)
    )).scalar() or 0

    outstanding_amount = (await db.execute(
        select(func.coalesce(func.sum(Payment.amount), 0))
        .join(Lease, Payment.lease_id == Lease.id)
        .join(Unit, Lease.unit_id == Unit.id)
        .join(Property, Unit.property_id == Property.id)
        .where(Payment.status.in_(["PENDING", "OVERDUE"]), Property.manager_id == manager_id)
    )).scalar() or 0

    # ── Monthly revenue for last 6 months ──────────────────────────────────
    now = datetime.utcnow()
    six_months_ago = now - timedelta(days=180)

    # SQLite compatible: use strftime for grouping by month
    monthly_stmt = (
        select(
            func.strftime("%Y-%m", Payment.paid_date).label("month_key"),
            func.sum(Payment.amount).label("revenue"),
        )
        .join(Lease, Payment.lease_id == Lease.id)
        .join(Unit, Lease.unit_id == Unit.id)
        .join(Property, Unit.property_id == Property.id)
        .where(
            Payment.status == "COMPLETED",
            Property.manager_id == manager_id,
            Payment.paid_date >= six_months_ago,
        )
        .group_by(func.strftime("%Y-%m", Payment.paid_date))
        .order_by(func.strftime("%Y-%m", Payment.paid_date).asc())
    )
    monthly_result = await db.execute(monthly_stmt)
    monthly_rows = monthly_result.all()

    # Build month labels for last 6 months
    month_names = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                   "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    monthly_data = []
    for i in range(5, -1, -1):
        dt = now - timedelta(days=30 * i)
        key = dt.strftime("%Y-%m")
        label = month_names[dt.month - 1]
        rev = 0
        for row in monthly_rows:
            if row.month_key == key:
                rev = row.revenue or 0
                break
        monthly_data.append({"month": label, "revenue": round(rev, 2)})

    vacant_units = total_units - occupied_units
    occupancy_rate = round((occupied_units / total_units) * 100, 1) if total_units > 0 else 0

    return {
        "totalProperties": total_properties,
        "totalUnits": total_units,
        "occupiedUnits": occupied_units,
        "vacantUnits": vacant_units,
        "occupancyRate": occupancy_rate,
        "totalTenants": total_tenants,
        "totalRevenue": round(total_revenue, 2),
        "pendingPayments": pending_payments,
        "outstandingAmount": round(outstanding_amount, 2),
        "monthlyRevenue": monthly_data,
    }
