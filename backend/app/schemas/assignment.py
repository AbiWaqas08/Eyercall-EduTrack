from pydantic import BaseModel
from datetime import datetime

# assignment schema
class AssignmentCreate(BaseModel):
    title: str
    description: str
    course_id: int
    batch_id: int
    due_date: datetime