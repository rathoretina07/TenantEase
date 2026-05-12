from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import or_
from typing import List
import models, schemas, auth
from database import get_db

router = APIRouter(prefix="/messages", tags=["messages"])

@router.get("/", response_model=List[schemas.Message])
async def get_messages(
    current_user: models.User = Depends(auth.get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(models.Message)
        .where(or_(models.Message.senderId == current_user.id, models.Message.receiverId == current_user.id))
        .order_by(models.Message.createdAt.asc())
    )
    return result.scalars().all()

@router.post("/", response_model=schemas.Message, status_code=status.HTTP_201_CREATED)
async def send_message(
    message_data: schemas.MessageCreate,
    current_user: models.User = Depends(auth.get_current_user),
    db: AsyncSession = Depends(get_db)
):
    receiver_id = message_data.receiverId
    
    # Bug Fix: Support looking up user by email if receiverId looks like an email
    if "@" in receiver_id:
        result = await db.execute(select(models.User).where(models.User.email == receiver_id))
        target_user = result.scalars().first()
        if not target_user:
            raise HTTPException(status_code=404, detail=f"User with email {receiver_id} not found")
        receiver_id = target_user.id

    new_message = models.Message(
        senderId=current_user.id,
        receiverId=receiver_id,
        content=message_data.content
    )
    db.add(new_message)
    await db.commit()
    await db.refresh(new_message)
    
    # Real-time event would be emitted here via Socket.io in main.py
    
    return new_message
