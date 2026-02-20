"""
Analysis router — file upload + insight retrieval.
"""

import json
import logging
from typing import List

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from ai_engine.analyzer import run_analysis
from auth.security import get_current_user
from database.session import get_db
from models.db_models import Analysis, User
from models.schemas import AnalysisOut, InsightReport

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/analysis", tags=["Analysis"])

MAX_UPLOAD_BYTES = 10 * 1024 * 1024  # 10 MB
ALLOWED_CONTENT_TYPES = {"text/csv", "application/csv", "application/octet-stream"}


@router.post("/upload", response_model=AnalysisOut, status_code=status.HTTP_201_CREATED)
async def upload_csv(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> AnalysisOut:
    """
    Accept a revenue CSV, run the full AI analysis pipeline,
    persist the result, and return the analysis record.
    """
    # Validate file type
    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="Only CSV files are accepted",
        )

    # Read and size-check
    contents = await file.read()
    if len(contents) > MAX_UPLOAD_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File exceeds maximum size of {MAX_UPLOAD_BYTES // 1024 // 1024} MB",
        )

    # Persist placeholder record
    record = Analysis(
        user_id=current_user.id,
        filename=file.filename,
        status="pending",
    )
    db.add(record)
    db.commit()
    db.refresh(record)

    # Run analysis
    try:
        report: InsightReport = run_analysis(contents)
        record.status = "complete"
        record.row_count = report.summary.total_invoices
        record.total_revenue = report.summary.total_revenue
        record.insights_json = report.model_dump_json()
    except ValueError as exc:
        record.status = "failed"
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(exc),
        )
    except Exception as exc:
        record.status = "failed"
        db.commit()
        logger.exception("Unexpected analysis error: %s", exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Internal analysis error",
        )

    db.commit()
    db.refresh(record)
    return AnalysisOut.model_validate(record)


@router.get("/{analysis_id}/report", response_model=InsightReport)
async def get_report(
    analysis_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> InsightReport:
    """Retrieve the full insight report for a completed analysis."""
    record = (
        db.query(Analysis)
        .filter(Analysis.id == analysis_id, Analysis.user_id == current_user.id)
        .first()
    )
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Analysis not found")
    if record.status != "complete" or not record.insights_json:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Analysis is in '{record.status}' state — no report available",
        )
    return InsightReport.model_validate_json(record.insights_json)


@router.get("/", response_model=List[AnalysisOut])
async def list_analyses(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> List[AnalysisOut]:
    """List all analyses belonging to the current user."""
    records = (
        db.query(Analysis)
        .filter(Analysis.user_id == current_user.id)
        .order_by(Analysis.created_at.desc())
        .all()
    )
    return [AnalysisOut.model_validate(r) for r in records]
