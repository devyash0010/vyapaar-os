import os
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(case_sensitive=True)

    PROJECT_NAME: str = "Vyapaar OS API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    # MongoDB settings
    MONGODB_URL: str = os.getenv("MONGODB_URL", "mongodb://localhost:27017")
    DATABASE_NAME: str = os.getenv("DATABASE_NAME", "vyapaar_os_db")

    # JWT Auth settings
    SECRET_KEY: str = os.getenv(
        "SECRET_KEY", "super-secret-key-for-vyapaar-os-development-only")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days


settings = Settings()
