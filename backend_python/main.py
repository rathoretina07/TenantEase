import socketio
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import auth, properties, messages, analytics, payments
import models
from database import engine

app = FastAPI(title="TenantEase API", version="1.0.0")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Socket.io setup
sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
sio_app = socketio.ASGIApp(sio, app)

@sio.event
async def connect(sid, environ):
    print(f"Client connected: {sid}")

@sio.event
async def disconnect(sid):
    print(f"Client disconnected: {sid}")

# Register Routers
app.include_router(auth.router)
app.include_router(properties.router)
app.include_router(messages.router)
app.include_router(analytics.router)
app.include_router(payments.router)

@app.get("/")
async def root():
    return {"message": "Welcome to TenantEase API (Python/FastAPI)"}

if __name__ == "__main__":
    import uvicorn
    # Use sio_app to support both FastAPI and Socket.io
    uvicorn.run(sio_app, host="0.0.0.0", port=3000)
