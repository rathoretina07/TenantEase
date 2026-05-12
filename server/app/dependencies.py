from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.auth import decode_access_token
from app.models import User

bearer_scheme = HTTPBearer()


class AuthUser:
    """Lightweight object attached to request after authentication."""
    def __init__(self, id: str, role: str, email: str):
        self.id = id
        self.role = role
        self.email = email


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: AsyncSession = Depends(get_db),
) -> AuthUser:
    payload = decode_access_token(credentials.credentials)
    if payload is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")

    user_id = payload.get("userId")
    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User no longer exists")

    return AuthUser(id=user.id, role=user.role, email=user.email)


def require_role(*roles: str):
    """Returns a dependency that checks the user has one of the allowed roles."""
    async def _check(user: AuthUser = Depends(get_current_user)):
        if user.role not in roles:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden: Insufficient permissions")
        return user
    return _check
