import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.trustedhost import TrustedHostMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings
from app.database.mongodb import db_client
from app.api.v1.router import api_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    if os.getenv("TESTING") == "1":
        print("Skipping MongoDB startup because TESTING=1")
    else:
        db_client.client = AsyncIOMotorClient(settings.MONGODB_URL)
        db_client.db = db_client.client[settings.DATABASE_NAME]
        print(f"Connected to MongoDB: {settings.DATABASE_NAME}")

    yield

    if db_client.client:
        db_client.client.close()
        print("Disconnected from MongoDB")


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Backend services for Vyapaar OS - Indian SMB OS",
    lifespan=lifespan,
)

# Harden origins from env, defaulting to the local Vite and React dev ports
allowed_origins = os.getenv(
    "CORS_ALLOWED_ORIGINS",
    "http://localhost:3000,http://localhost:5173,http://127.0.0.1:3000,http://127.0.0.1:5173",
).split(",")

allowed_hosts = os.getenv(
    "ALLOWED_HOSTS", "localhost,127.0.0.1,testserver").split(",")

# CORS configuration for your React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)

app.add_middleware(TrustedHostMiddleware, allowed_hosts=allowed_hosts)


@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
    response.headers["Content-Security-Policy"] = "default-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["X-Permitted-Cross-Domain-Policies"] = "none"
    return response

# Include Modular API Routers
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/")
async def root():
    return {
        "message": "Vyapaar OS Core API is operational.",
        "docs_url": "/docs",
        "ai_ready": True,
        "n8n_webhooks_enabled": True
    }
