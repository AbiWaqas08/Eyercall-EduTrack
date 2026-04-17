from pydantic import BaseModel
from datetime import date
# batch schema
class BatchBase(BaseModel):
    name : str
    start_date: date
    end_date: date
    course_id : int


# create batch
class BatchCreate(BatchBase):
    pass 