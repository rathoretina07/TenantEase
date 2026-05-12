from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import socketio

from app.database import init_db
from app.config import settings
from app.auth import decode_access_token

# ── Socket.io server ──────────────────────────────────────────────────────
sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins=[],  # handled by FastAPI CORS
)


@sio.event
async def connect(sid, environ, auth):
    """Authenticate socket connection via JWT."""
    token = auth.get("token") if auth else None
    if not token:
        raise socketio.exceptions.ConnectionRefusedError("Authentication required")

    payload = decode_access_token(token)
    if not payload:
        raise socketio.exceptions.ConnectionRefusedError("Invalid token")

    user_id = payload.get("userId")
    await sio.save_session(sid, {"userId": user_id, "role": payload.get("role")})
    sio.enter_room(sid, f"user_{user_id}")
    print(f"🔌 Socket connected: user_{user_id}")


@sio.event
async def disconnect(sid):
    session = await sio.get_session(sid)
    user_id = session.get("userId", "unknown")
    print(f"🔌 Socket disconnected: user_{user_id}")


# ── FastAPI lifespan ──────────────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    print(f"🚀 TenantEase API running on port {settings.PORT}")
    print("🔌 Socket.io WebSocket server attached")
    print("📊 Routes: /api/auth | /api/properties | /api/payments | /api/tenants | /api/messages | /api/analytics")
    yield


# ── App factory ───────────────────────────────────────────────────────────
def create_app() -> FastAPI:
    app = FastAPI(
        title="TenantEase API",
        version="2.0.0",
        lifespan=lifespan,
    )

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origin_regex=r"http://localhost(:\d+)?",
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Health check
    @app.get("/health")
    async def health():
        from datetime import datetime
        return {"status": "ok", "timestamp": datetime.utcnow().isoformat()}

    # Register routers
    from app.routes.auth import router as auth_router
    from app.routes.properties import router as properties_router
    from app.routes.payments import router as payments_router
    from app.routes.tenants import router as tenants_router
    from app.routes.messages import router as messages_router
    from app.routes.analytics import router as analytics_router

    app.include_router(auth_router)
    app.include_router(properties_router)
    app.include_router(payments_router)
    app.include_router(tenants_router)
    app.include_router(messages_router)
    app.include_router(analytics_router)

    # Wrap with Socket.io ASGI
    combined_app = socketio.ASGIApp(sio, other_app=app)

    return combined_app


app = create_app()
