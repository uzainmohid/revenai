"""
Auth router — register + login endpoints.
"""

import logging
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from auth.security import hash_password, verify_password, create_access_token
from database.session import get_db
from models.db_models import User
from models.schemas import LoginRequest, TokenResponse, UserCreate, UserOut

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
async def register(payload: UserCreate, db: Session = Depends(get_db)) -> UserOut:
    """Create a new user account."""
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email already registered",
        )
    user = User(
        email=payload.email,
        hashed_password=hash_password(payload.password),
        full_name=payload.full_name,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    logger.info("New user registered: %s", user.email)
    return UserOut.model_validate(user)


@router.post("/login", response_model=TokenResponse)
async def login(payload: LoginRequest, db: Session = Depends(get_db)) -> TokenResponse:
    """Authenticate and return a JWT access token."""
    user = db.query(User).filter(User.email == payload.email).first()
    if not user or not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    token = create_access_token(subject=user.email)
    logger.info("User logged in: %s", user.email)
    return TokenResponse(access_token=token)
