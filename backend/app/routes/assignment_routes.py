from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.assignment import Assignment
from app.schemas.assignment import AssignmentCreate

from app.models.course import Course
from app.models.batch import Batch


router = APIRouter(prefix="/assignments", tags=["Assignments"])

# create assignment
@router.post("/")
def create_assignment(data: AssignmentCreate, db: Session = Depends(get_db)):
    # inside create_assignment
    course = db.query(Course).filter(Course.id == data.course_id).first()
    if not course:
        raise HTTPException(status_code=400, detail="Invalid course_id")

    batch = db.query(Batch).filter(Batch.id == data.batch_id).first()
    if not batch:
        raise HTTPException(status_code=400, detail="Invalid batch_id")   
    
    if batch.course_id != course.id:
        raise HTTPException(status_code=400, detail="Batch does not belong to this course")

    assignment = Assignment(**data.dict())

    db.add(assignment)
    db.commit()
    db.refresh(assignment)

    return {
        "message": "Assignment created",
        "assignment" : assignment
    }


# get all assignmnets
@router.get("/")
def get_assignmnets(db: Session = Depends(get_db)):
    return db.query(Assignment).all()









