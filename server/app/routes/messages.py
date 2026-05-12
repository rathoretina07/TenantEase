import re
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.models import Message, User, Profile
from app.dependencies import get_current_user, AuthUser

router = APIRouter(prefix="/api/messages", tags=["messages"])

# Simple email regex for detecting if input is an email
_EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def _msg_dict(m: Message) -> dict:
    def _user(u: User | None) -> dict | None:
        if u is None:
            return None
        profile = None
        if u.profile:
            profile = {"firstName": u.profile.first_name, "lastName": u.profile.last_name}
        return {"id": u.id, "email": u.email, "profile": profile}

    return {
        "id": m.id,
        "content": m.content,
        "createdAt": m.created_at.isoformat() if m.created_at else None,
        "readAt": m.read_at.isoformat() if m.read_at else None,
        "sender": _user(m.sender),
        "receiver": _user(m.receiver),
    }


class SendMessageBody(BaseModel):
    receiverId: str  # Can be a UUID or an email address
    content: str


@router.get("/")
async def get_messages(
    user: AuthUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    stmt = (
        select(Message)
        .where((Message.sender_id == user.id) | (Message.receiver_id == user.id))
        .options(
            selectinload(Message.sender).selectinload(User.profile),
            selectinload(Message.receiver).selectinload(User.profile),
        )
        .order_by(Message.created_at.asc())
    )
    result = await db.execute(stmt)
    messages = result.scalars().unique().all()
    return [_msg_dict(m) for m in messages]


@router.post("/", status_code=201)
async def send_message(
    body: SendMessageBody,
    user: AuthUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    if not body.content.strip():
        raise HTTPException(status_code=400, detail="Message content cannot be empty")

    receiver_id = body.receiverId.strip()

    # ── BUG FIX: If the receiverId looks like an email, resolve it to a UUID ──
    if _EMAIL_RE.match(receiver_id):
        result = await db.execute(select(User).where(User.email == receiver_id))
        receiver = result.scalar_one_or_none()
        if receiver is None:
            raise HTTPException(status_code=404, detail=f"User not found with email: {receiver_id}")
        receiver_id = receiver.id
    else:
        # Verify the UUID user exists
        result = await db.execute(select(User).where(User.id == receiver_id))
        receiver = result.scalar_one_or_none()
        if receiver is None:
            raise HTTPException(status_code=404, detail=f"User not found with ID: {receiver_id}")

    msg = Message(
        sender_id=user.id,
        receiver_id=receiver_id,
        content=body.content.strip(),
    )
    db.add(msg)
    await db.commit()
    await db.refresh(msg)

    # Reload with relationships
    result = await db.execute(
        select(Message)
        .where(Message.id == msg.id)
        .options(
            selectinload(Message.sender).selectinload(User.profile),
            selectinload(Message.receiver).selectinload(User.profile),
        )
    )
    msg = result.scalar_one()
    return _msg_dict(msg)
