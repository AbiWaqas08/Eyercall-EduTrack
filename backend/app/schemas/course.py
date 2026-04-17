from pydantic import BaseModel


# schema for course
class CourseBase(BaseModel):
    title :  str
    description : str | None = None
    duration_days : int


# create course
class CourseCreate(CourseBase):
    pass 