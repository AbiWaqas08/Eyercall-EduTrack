from pydantic import BaseModel

# batch schema
class BatchBase(BaseModel):
    name : str
    course_id : int


# create batch
class Batchcreate(BatchBase):
    pass 