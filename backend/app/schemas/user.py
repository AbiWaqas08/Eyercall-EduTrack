from pydantic import BaseModel, EmailStr
from datetime import datetime

class StudentCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    course_id: int
    batch_id: int
    fee: int
    course_end_date: datetime