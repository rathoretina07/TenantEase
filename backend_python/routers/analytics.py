from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import func, and_
from datetime import datetime, timedelta
import models, auth
from database import get_db

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/")
async def get_analytics(
    current_user: models.User = Depends(auth.check_role(["MANAGER", "ADMIN"])),
    db: AsyncSession = Depends(get_db)
):
    manager_id = current_user.id
    now = datetime.utcnow()
    six_months_ago = datetime(now.year, now.month, 1) - timedelta(days=150) # Approx 6 months

    # 1. Total Properties
    prop_count = await db.execute(select(func.count(models.Property.id)).where(models.Property.managerId == manager_id, models.Property.deletedAt == None))
    total_properties = prop_count.scalar() or 0

    # 2. Units stats
    unit_stats = await db.execute(
        select(
            func.count(models.Unit.id),
            func.count(models.Unit.id).filter(models.Unit.status == "OCCUPIED")
        ).join(models.Property).where(models.Property.managerId == manager_id, models.Unit.deletedAt == None)
    )
    total_units, occupied_units = unit_stats.one()
    vacant_units = total_units - occupied_units
    occupancy_rate = round((occupied_units / total_units) * 100) if total_units > 0 else 0

    # 3. Total Tenants (Unique tenants with active leases in manager's properties)
    tenant_count = await db.execute(
        select(func.count(func.distinct(models.Lease.tenantId)))
        .join(models.Unit).join(models.Property)
        .where(models.Property.managerId == manager_id, models.Lease.status == "ACTIVE")
    )
    total_tenants = tenant_count.scalar() or 0

    # 4. Revenue Aggregates (Completed payments)
    revenue_agg = await db.execute(
        select(func.sum(models.Payment.amount))
        .join(models.Lease).join(models.Unit).join(models.Property)
        .where(models.Property.managerId == manager_id, models.Payment.status == "COMPLETED")
    )
    total_revenue = revenue_agg.scalar() or 0

    # 5. Pending Payments
    pending_count = await db.execute(
        select(func.count(models.Payment.id))
        .join(models.Lease).join(models.Unit).join(models.Property)
        .where(models.Property.managerId == manager_id, models.Payment.status == "PENDING")
    )
    pending_payments = pending_count.scalar() or 0

    # 6. Outstanding Amount
    outstanding_agg = await db.execute(
        select(func.sum(models.Payment.amount))
        .join(models.Lease).join(models.Unit).join(models.Property)
        .where(models.Property.managerId == manager_id, models.Payment.status == "PENDING")
    )
    outstanding_amount = outstanding_agg.scalar() or 0

    # 7. Monthly Revenue (Last 6 months)
    payments_result = await db.execute(
        select(models.Payment.amount, models.Payment.paidDate)
        .join(models.Lease).join(models.Unit).join(models.Property)
        .where(
            models.Property.managerId == manager_id,
            models.Payment.status == "COMPLETED",
            models.Payment.paidDate >= six_months_ago
        )
    )
    payments = payments_result.all()

    months_list = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    monthly_revenue_map = {}
    
    # Initialize last 6 months
    for i in range(6):
        d = datetime(now.year, now.month, 1) - timedelta(days=i*30)
        month_label = months_list[d.month - 1]
        monthly_revenue_map[month_label] = 0

    for amount, paid_date in payments:
        if paid_date:
            month_label = months_list[paid_date.month - 1]
            if month_label in monthly_revenue_map:
                monthly_revenue_map[month_label] += amount

    monthly_revenue = [{"month": m, "revenue": r} for m, r in monthly_revenue_map.items()]
    monthly_revenue.reverse()

    return {
        "totalProperties": total_properties,
        "totalUnits": total_units,
        "occupiedUnits": occupied_units,
        "vacantUnits": vacant_units,
        "occupancyRate": occupancy_rate,
        "totalTenants": total_tenants,
        "totalRevenue": total_revenue,
        "pendingPayments": pending_payments,
        "outstandingAmount": outstanding_amount,
        "monthlyRevenue": monthly_revenue
    }
