"""
Database session factory.
SQLite for development/MVP; swap DATABASE_URL env var for Postgres in production.
"""

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./revenai.db")

# SQLite needs check_same_thread=False; Postgres ignores this kwarg
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args, echo=False)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def get_db():
    """FastAPI dependency — yields a DB session and closes it on exit."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db() -> None:
    """Create all tables. Called once at startup."""
    from models import db_models  # noqa: F401 — registers ORM models
    Base.metadata.create_all(bind=engine)
