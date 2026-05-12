from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
import models, schemas, auth
from database import get_db

router = APIRouter(prefix="/properties", tags=["properties"])

@router.get("/", response_model=List[schemas.Property])
async def get_properties(
    current_user: models.User = Depends(auth.get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Managers only see their own properties
    query = select(models.Property).where(models.Property.deletedAt == None)
    if current_user.role == "MANAGER":
        query = query.where(models.Property.managerId == current_user.id)
    
    result = await db.execute(query)
    return result.scalars().all()

@router.post("/", response_model=schemas.Property, status_code=status.HTTP_201_CREATED)
async def create_property(
    prop_data: schemas.PropertyCreate,
    current_user: models.User = Depends(auth.check_role(["MANAGER", "ADMIN"])),
    db: AsyncSession = Depends(get_db)
):
    new_prop = models.Property(
        managerId=current_user.id,
        name=prop_data.name,
        address=prop_data.address,
        city=prop_data.city,
        state=prop_data.state,
        zipCode=prop_data.zipCode,
        country=prop_data.country
    )
    db.add(new_prop)
    await db.commit()
    await db.refresh(new_prop)
    return new_prop
