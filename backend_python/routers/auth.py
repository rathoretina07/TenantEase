from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
import models, schemas, auth
from database import get_db

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/register", response_model=schemas.Token, status_code=status.HTTP_201_CREATED)
async def register(user_data: schemas.UserCreate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.User).where(models.User.email == user_data.email))
    if result.scalars().first():
        raise HTTPException(status_code=400, detail="Email already in use")

    password_hash = auth.get_password_hash(user_data.password)
    new_user = models.User(
        email=user_data.email,
        passwordHash=password_hash,
        role=user_data.role
    )
    db.add(new_user)
    await db.flush()

    new_profile = models.Profile(
        userId=new_user.id,
        firstName=user_data.firstName,
        lastName=user_data.lastName
    )
    db.add(new_profile)
    await db.commit()
    await db.refresh(new_user)
    
    # Reload with profile
    result = await db.execute(
        select(models.User).where(models.User.id == new_user.id).options(selectinload(models.User.profile))
    )
    user = result.scalars().first()

    token = auth.create_access_token(data={"userId": user.id, "role": user.role})
    return {"token": token, "user": user}

@router.post("/login", response_model=schemas.Token)
async def login(credentials: schemas.UserLogin, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(models.User).where(models.User.email == credentials.email).options(selectinload(models.User.profile))
    )
    user = result.scalars().first()

    if not user or not auth.verify_password(credentials.password, user.passwordHash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = auth.create_access_token(data={"userId": user.id, "role": user.role})
    return {"token": token, "user": user}

@router.get("/me", response_model=schemas.User)
async def get_me(current_user: models.User = Depends(auth.get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(models.User).where(models.User.id == current_user.id).options(selectinload(models.User.profile))
    )
    return result.scalars().first()
