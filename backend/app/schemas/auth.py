from pydantic import BaseModel

class LoginSchema(BaseModel):
    email : str
    password: str

class tokenResponse(BaseModel):
    access_token: str
    role: str
    name: str
    email: str
    