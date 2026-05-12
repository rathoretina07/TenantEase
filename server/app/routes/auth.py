from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models import User, Profile
from app.auth import hash_password, verify_password, create_access_token
from app.dependencies import get_current_user, AuthUser

router = APIRouter(prefix="/api/auth", tags=["auth"])


# ── Schemas ────────────────────────────────────────────────────────────────
class RegisterBody(BaseModel):
    email: EmailStr
    password: str
    role: str  # MANAGER | TENANT
    firstName: str
    lastName: str


class LoginBody(BaseModel):
    email: EmailStr
    password: str


# ── Helpers ────────────────────────────────────────────────────────────────
def _profile_dict(profile: Profile | None) -> dict | None:
    if profile is None:
        return None
    return {
        "id": profile.id,
        "firstName": profile.first_name,
        "lastName": profile.last_name,
        "phone": profile.phone,
        "avatarUrl": profile.avatar_url,
    }


def _user_response(user: User, token: str) -> dict:
    return {
        "token": token,
        "user": {
            "id": user.id,
            "email": user.email,
            "role": user.role,
            "profile": _profile_dict(user.profile),
        },
    }


# ── Routes ─────────────────────────────────────────────────────────────────
@router.post("/register", status_code=201)
async def register(body: RegisterBody, db: AsyncSession = Depends(get_db)):
    existing = await db.execute(select(User).where(User.email == body.email))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Email already in use")

    user = User(
        email=body.email,
        password_hash=hash_password(body.password),
        role=body.role,
    )
    db.add(user)
    await db.flush()  # get user.id

    profile = Profile(
        user_id=user.id,
        first_name=body.firstName,
        last_name=body.lastName,
    )
    db.add(profile)
    await db.commit()
    await db.refresh(user)

    # Eagerly load profile
    result = await db.execute(
        select(User).where(User.id == user.id)
    )
    user = result.scalar_one()
    await db.refresh(user, ["profile"])

    token = create_access_token(user.id, user.role)
    return _user_response(user, token)


@router.post("/login")
async def login(body: LoginBody, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == body.email))
    user = result.scalar_one_or_none()

    if not user or not verify_password(body.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    await db.refresh(user, ["profile"])
    token = create_access_token(user.id, user.role)
    return _user_response(user, token)


@router.get("/me")
async def get_me(
    current_user: AuthUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(User).where(User.id == current_user.id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    await db.refresh(user, ["profile"])

    return {
        "id": user.id,
        "email": user.email,
        "role": user.role,
        "isVerified": user.is_verified,
        "createdAt": user.created_at.isoformat() if user.created_at else None,
        "profile": _profile_dict(user.profile),
    }
