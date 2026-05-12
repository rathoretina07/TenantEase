from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
import models, schemas, auth
from database import get_db

router = APIRouter(prefix="/payments", tags=["payments"])

@router.get("/", response_model=List[schemas.Payment])
async def get_payments(
    current_user: models.User = Depends(auth.get_current_user),
    db: AsyncSession = Depends(get_db)
):
    query = select(models.Payment)
    if current_user.role == "TENANT":
        query = query.where(models.Payment.tenantId == current_user.id)
    elif current_user.role == "MANAGER":
        query = query.join(models.Lease).join(models.Unit).join(models.Property).where(models.Property.managerId == current_user.id)
    
    result = await db.execute(query)
    return result.scalars().all()
