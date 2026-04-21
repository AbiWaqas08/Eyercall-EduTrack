from pydantic import BaseModel

class MarkSubmission(BaseModel):
    marks : int
    feedback : str