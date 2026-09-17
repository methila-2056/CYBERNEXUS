"""Database connectivity (SQLAlchemy 2.x).

- PostgreSQL for development/docker-compose.
- SQLite fallback for tests (`sqlite://`) and lightweight local runs.

The engine is built lazily so that tests can override the database URL
*before* the first use.
"""

from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.config import get_settings


class Base(DeclarativeBase):
    """Base class for all ORM models."""


def build_engine(database_url: str | None = None):
    """Create an SQLAlchemy engine for the given (or configured) URL."""
    url = database_url or get_settings().database_url

    connect_args = {}
    if url.startswith("sqlite"):
        # SQLite may be accessed from multiple threads in dev.
        connect_args["check_same_thread"] = False

    if url == "sqlite://":
        # In-memory SQLite must reuse a single connection across sessions.
        return create_engine(
            url,
            connect_args=connect_args,
            poolclass=StaticPool,
        )

    return create_engine(url, pool_pre_ping=True, connect_args=connect_args)


_engine = None
_session_local: sessionmaker | None = None


def get_engine():
    """Return the process-wide engine, creating it on first use."""
    global _engine
    if _engine is None:
        _engine = build_engine()
    return _engine


def get_session_local() -> sessionmaker[Session]:
    """Return a session factory bound to the process-wide engine."""
    global _session_local
    if _session_local is None:
        _session_local = sessionmaker(
            bind=get_engine(),
            autoflush=False,
            autocommit=False,
        )
    return _session_local


def get_db() -> Generator[Session, None, None]:
    """FastAPI dependency yielding a database session and closing it after use."""
    db: Session = get_session_local()()
    try:
        yield db
    finally:
        db.close()
