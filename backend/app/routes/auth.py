from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import session


from app.database import get_db
from app.models.user import User
from app.schemas.auth import LoginSchema
from app.utils.password import verfy_password
from app.core.security import create_access_token


# create router
router = APIRouter()

# create route for login
@router.post("/login")
def login(data : LoginSchema, db: session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        raise HTTPException(status_code=400,  detail="user not found")
    if not verfy_password:
        raise HTTPException(status_code=400, detail="Invalid password")
    
    token = create_access_token({"sub": user.email, "role": user.role})
    return{
        "access_token": token,
        "role": user.role,
        "name": user.name,
        "email": user.email
    }

@router.get("/")
def api_check():
    return{"message": "login api is working"}
