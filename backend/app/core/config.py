"""Typed, environment-driven application settings.

Every value changes at runtime through environment variables (or a `.env`
file at the repo root). Secrets never live in source code.
"""

from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from the environment.

    Values can be overridden in a `.env` file. `extra="ignore"` means unknown
    variables are safely ignored instead of raising.
    """

    model_config = SettingsConfigDict(
        env_file=(".env", "../.env"),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    # --- General ---
    app_name: str = "CYBERNEXUS"
    app_env: str = "development"  # development | test | production
    debug: bool = False
    log_level: str = "INFO"

    # --- API ---
    api_v1_prefix: str = "/api/v1"

    # --- Database ---
    # Default expects the `postgres` service from docker-compose.yml.
    # Use `sqlite:///./cybernexus.db` (or `sqlite://` in tests) as a fallback.
    database_url: str = (
        "postgresql+psycopg://cybernexus:cybernexus@localhost:5432/cybernexus"
    )

    # --- Security ---
    # Override in .env with a long random value (never commit a real secret).
    secret_key: str = "change-me"

    # --- CORS ---
    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"

    # --- JWT (used from Phase 2 onwards) ---
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 30

    @property
    def cors_origin_list(self) -> list[str]:
        """Parse the comma-separated origins string into a list."""
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    """Return a cached Settings instance (reads env once per process)."""
    return Settings()