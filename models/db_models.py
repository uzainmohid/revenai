"""
SQLAlchemy ORM models for REVENAI.
Designed for SQLite now; swap engine URL for Postgres with zero model changes.
"""

from datetime import datetime
from sqlalchemy import Column, Integer, String, Float, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship

from database.session import Base


class User(Base):
    """Application user — login identity."""

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    is_active = Column(Integer, default=1)  # SQLite-friendly bool

    analyses = relationship("Analysis", back_populates="owner", cascade="all, delete-orphan")


class Analysis(Base):
    """One uploaded CSV → one analysis record."""

    __tablename__ = "analyses"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    filename = Column(String(255), nullable=False)
    row_count = Column(Integer, nullable=True)
    total_revenue = Column(Float, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String(50), default="pending")  # pending | complete | failed
    insights_json = Column(Text, nullable=True)       # serialized InsightReport

    owner = relationship("User", back_populates="analyses")
