from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.course import Course
from app.schemas.course import CourseCreate


# define router
router = APIRouter(prefix="/courses", tags=["Courses"])

# create post router
@router.post("/")
def create_course(course : CourseCreate, db : Session = Depends(get_db)):
    new_course = Course(**course.dict())
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return(new_course)


# get all courses
@router.get("/")
def get_courses(db : Session = Depends(get_db)):
    return db.query(Course).all()

