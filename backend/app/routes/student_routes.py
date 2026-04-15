
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User

router = APIRouter(prefix="/students", tags=["Students"])


@router.put("/{id}/assign")
def assign_student(
    id: int,
    course_id: int,
    batch_id: int,
    db: Session = Depends(get_db)
):
    student = db.query(User).filter(User.id == id).first()

    if not student:
        return {"error": "Student not found"}

    student.course_id = course_id
    student.batch_id = batch_id

    db.commit()
    db.refresh(student)

    return student