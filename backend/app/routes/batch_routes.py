from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.batch import Batch
from app.models.course import Course
from app.schemas.batch import BatchCreate

router = APIRouter(prefix="/batches", tags=["Batches"])


# ➕ CREATE BATCH
@router.post("/")
def create_batch(data: BatchCreate, db: Session = Depends(get_db)):

    # ✅ check course exists
    course = db.query(Course).filter(Course.id == data.course_id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    # ✅ optional: prevent duplicate batch name in same course
    existing = db.query(Batch).filter(
        Batch.name == data.name,
        Batch.course_id == data.course_id
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Batch already exists for this course"
        )

    batch = Batch(**data.dict())

    db.add(batch)
    db.commit()
    db.refresh(batch)

    return {
        "message": "Batch created successfully",
        "batch": batch
    }


# 📄 GET ALL BATCHES
@router.get("/")
def get_batches(db: Session = Depends(get_db)):
    return db.query(Batch).all()