import os
from pathlib import Path
from typing import List, Union
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

# Find .env in backend dir or parent root dir
BACKEND_DIR = Path(__file__).resolve().parent.parent.parent
ROOT_DIR = BACKEND_DIR.parent
ENV_FILE = BACKEND_DIR / ".env" if (BACKEND_DIR / ".env").exists() else ROOT_DIR / ".env"

class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=str(ENV_FILE) if ENV_FILE.exists() else None,
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False
    )

    PROJECT_NAME: str = "Vyapaar OS API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "production"

    # Database
    MONGODB_URL: str = "mongodb://localhost:27017/vyapaar_core"
    DATABASE_NAME: str = "vyapaar_core"
    REDIS_URL: str = "redis://localhost:6379"

    # Security
    SECRET_KEY: str = "vyapaar-os-secure-production-secret-key-2026"
    JWT_SECRET: str = ""
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days

    # CORS & Hosts
    CORS_ALLOWED_ORIGINS: Union[str, List[str]] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173"
    ]
    ALLOWED_HOSTS: Union[str, List[str]] = [
        "localhost",
        "127.0.0.1",
        "testserver",
        "api"
    ]

    # Automation & AI
    OPENAI_API_KEY: str = ""
    WEBHOOK_URL: str = "http://localhost:5678/"
    N8N_ENCRYPTION_KEY: str = ""

    @property
    def effective_secret_key(self) -> str:
        return self.JWT_SECRET or self.SECRET_KEY

    def get_cors_origins(self) -> List[str]:
        if isinstance(self.CORS_ALLOWED_ORIGINS, list):
            return self.CORS_ALLOWED_ORIGINS
        return [origin.strip() for origin in self.CORS_ALLOWED_ORIGINS.split(",") if origin.strip()]

    def get_allowed_hosts(self) -> List[str]:
        if isinstance(self.ALLOWED_HOSTS, list):
            return self.ALLOWED_HOSTS
        return [host.strip() for host in self.ALLOWED_HOSTS.split(",") if host.strip()]

settings = Settings()
