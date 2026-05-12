import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite+aiosqlite:///./dev.db"
    JWT_SECRET: str = "tenantease-jwt-super-secret-key-2026"
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRY_DAYS: int = 7
    PORT: int = 3000

    class Config:
        env_file = ".env"
        extra = "ignore"

settings = Settings()
