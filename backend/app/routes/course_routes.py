from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.course import Course
from app.schemas.course import CourseCreate


# define router
router = APIRouter(prefix="/courses", tags=["Courses"])

# create post router
@router.post("/")
@router.post("/")
def create_course(data: CourseCreate, db: Session = Depends(get_db)):

    # 🔍 CHECK IF TITLE EXISTS
    existing = db.query(Course).filter(Course.title == data.title).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Course with this title already exists"
        )

    # ✅ CREATE COURSE
    course = Course(**data.dict())

    db.add(course)
    db.commit()
    db.refresh(course)

    return {
        "message": "Course created successfully",
        "course": course
    }


# get all courses
@router.get("/")
def get_courses(db : Session = Depends(get_db)):
    return db.query(Course).all()

