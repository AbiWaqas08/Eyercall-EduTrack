from pydantic import BaseModel, EmailStr

# 🔐 Admin Signup
class AdminSignup(BaseModel):
    name: str
    email: EmailStr
    password: str


# 🔐 Login
class LoginSchema(BaseModel):
    email: EmailStr
    password: str


# 🎯 Response
class TokenResponse(BaseModel):
    access_token: str
    role: str
    name: str
    email: str