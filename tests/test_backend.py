"""
Backend integration tests for REVENAI.
Tests auth endpoints and basic API health.
"""

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from backend.main import app
from database.session import Base, get_db

# ─── Test DB setup ───────────────────────────────────────────────────────────────

TEST_DB_URL = "sqlite:///./test_revenai.db"

engine_test = create_engine(TEST_DB_URL, connect_args={"check_same_thread": False})
TestingSession = sessionmaker(autocommit=False, autoflush=False, bind=engine_test)


def override_get_db():
    db = TestingSession()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture(scope="module", autouse=True)
def setup_database():
    """Create tables before tests, drop them after."""
    from models import db_models  # noqa: F401
    Base.metadata.create_all(bind=engine_test)
    app.dependency_overrides[get_db] = override_get_db
    yield
    Base.metadata.drop_all(bind=engine_test)
    app.dependency_overrides.clear()


@pytest.fixture(scope="module")
def client():
    return TestClient(app)


# ─── Health ──────────────────────────────────────────────────────────────────────

def test_health_endpoint(client):
    """Service should return 200 on /health."""
    resp = client.get("/health")
    assert resp.status_code == 200
    assert resp.json()["status"] == "ok"


# ─── Auth ────────────────────────────────────────────────────────────────────────

TEST_EMAIL = "test@revenai.io"
TEST_PASSWORD = "supersecret123"


def test_register_user(client):
    """New user registration should return 201 with user data."""
    resp = client.post(
        "/auth/register",
        json={"email": TEST_EMAIL, "password": TEST_PASSWORD, "full_name": "Test User"},
    )
    assert resp.status_code == 201
    data = resp.json()
    assert data["email"] == TEST_EMAIL
    assert "id" in data


def test_register_duplicate(client):
    """Registering the same email twice should return 409."""
    resp = client.post(
        "/auth/register",
        json={"email": TEST_EMAIL, "password": TEST_PASSWORD},
    )
    assert resp.status_code == 409


def test_login_success(client):
    """Valid credentials should return a JWT access token."""
    resp = client.post(
        "/auth/login",
        json={"email": TEST_EMAIL, "password": TEST_PASSWORD},
    )
    assert resp.status_code == 200
    assert "access_token" in resp.json()


def test_login_wrong_password(client):
    """Wrong password should return 401."""
    resp = client.post(
        "/auth/login",
        json={"email": TEST_EMAIL, "password": "wrongpassword"},
    )
    assert resp.status_code == 401


def test_upload_requires_auth(client):
    """Uploading without a token should return 403."""
    resp = client.post("/analysis/upload", files={"file": ("data.csv", b"col1,col2\n1,2", "text/csv")})
    assert resp.status_code in (401, 403)


def test_upload_with_token(client):
    """A valid CSV with a valid token should return 201."""
    # Login first
    token = client.post(
        "/auth/login",
        json={"email": TEST_EMAIL, "password": TEST_PASSWORD},
    ).json()["access_token"]

    import pathlib
    csv_path = pathlib.Path(__file__).parent.parent / "sample_data" / "revenue_sample.csv"
    csv_bytes = csv_path.read_bytes()

    resp = client.post(
        "/analysis/upload",
        files={"file": ("revenue_sample.csv", csv_bytes, "text/csv")},
        headers={"Authorization": f"Bearer {token}"},
    )
    assert resp.status_code == 201
    data = resp.json()
    assert data["status"] == "complete"
    assert data["row_count"] > 0
