"""
Authentication utilities: password hashing + JWT creation/verification.
"""

import os
from datetime import datetime, timedelta, timezone
from typing import Optional

import bcrypt
from jose import JWTError, jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from database.session import get_db
from models.db_models import User

# ─── Config ────────────────────────────────────────────────────────────────────

SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "change-me-in-production-please")
ALGORITHM: str = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("JWT_EXPIRE_MINUTES", "60"))

bearer_scheme = HTTPBearer()

# ─── Password ──────────────────────────────────────────────────────────────────

def hash_password(plain: str) -> str:
    """Return bcrypt hash of plain-text password."""
    return bcrypt.hashpw(plain.encode(), bcrypt.gensalt()).decode()


def verify_password(plain: str, hashed: str) -> bool:
    """Verify plain-text against stored bcrypt hash."""
    return bcrypt.checkpw(plain.encode(), hashed.encode())


# ─── JWT ───────────────────────────────────────────────────────────────────────

def create_access_token(subject: str) -> str:
    """Create a signed JWT with an expiry claim."""
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {"sub": subject, "exp": expire}
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def decode_token(token: str) -> Optional[str]:
    """Return the subject claim from a valid JWT, or None."""
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload.get("sub")
    except JWTError:
        return None


# ─── FastAPI Dependency ─────────────────────────────────────────────────────────

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    """Resolve Bearer token → User ORM object. Raises 401 on failure."""
    token = credentials.credentials
    email = decode_token(token)
    if email is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )
    user = db.query(User).filter(User.email == email).first()
    if user is None or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive",
        )
    return user
