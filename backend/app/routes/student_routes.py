from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.user import StudentCreate
from app.utils.password import hash_password

router = APIRouter(prefix="/students", tags=["Students"])


# ➕ CREATE STUDENT
@router.post("/")
def create_student(data: StudentCreate, db: Session = Depends(get_db)):

    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    student = User(
        name=data.name,
        email=data.email,
        password=hash_password(data.password),
        role="student",   # 👈 important
        course_id=data.course_id,
        batch_id=data.batch_id,
        fee=data.fee,
        course_end_date=data.course_end_date
    )

    db.add(student)
    db.commit()
    db.refresh(student)

    return {"message": "Student created successfully"}


# get all students
@router.get("/")
def get_students(db: Session = Depends(get_db)):
    return db.query(User).filter(User.role == "student").all()

# get single student
@router.get("/{id}")
def get_student(id : int, db : Session = Depends(get_db)):
    student = db.qurey(User).filter(User.id == id).all()

    if not student:
        raise HTTPException(status_code=404, detail="student not found")
    
    return student

# update student
@router.put("/{id}")
def update_student(id: int, data: StudentCreate, db: Session = Depends(get_db)):
    student = db.query(User).filter(User.id == id).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    student.name = data.name
    student.email = data.email
    student.course_id = data.course_id
    student.batch_id = data.batch_id
    student.fee = data.fee
    student.course_end_date = data.course_end_date

    db.commit()
    db.refresh(student)

    return {"message": "Student updated"}

# delete student
@router.delete("/{id}")
def delete_student(id: int, db: Session = Depends(get_db)):
    student = db.query(User).filter(User.id == id).first()

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    db.delete(student)
    db.commit()

    return {"message": "Student deleted"}
