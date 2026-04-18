from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.schemas.auth import AdminSignup, LoginSchema, TokenResponse
from app.utils.password import hash_password, verfy_password
from app.core.security import create_access_token

router = APIRouter(prefix="/auth", tags=["Auth"])


# 🟢 ADMIN SIGNUP
@router.post("/signup-admin")
def signup_admin(data: AdminSignup, db: Session = Depends(get_db)):

    # check if email exists
    existing = db.query(User).filter(User.email == data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    admin = User(
        name=data.name,
        email=data.email,
        password=hash_password(data.password),
        role="admin"
    )

    db.add(admin)
    db.commit()
    db.refresh(admin)

    return {"message": "Admin created successfully"}


# 🟢 LOGIN (ADMIN + STUDENT)
@router.post("/login", response_model=TokenResponse)
def login(data: LoginSchema, db: Session = Depends(get_db)):

    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        raise HTTPException(status_code=400, detail="User not found")

    # ✅ correct password check
    if not verfy_password(data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid password")

    # 🔒 LMS LOGIC (student restriction)
    from datetime import datetime
    if user.role == "student" and user.course_end_date:
        if user.course_end_date < datetime.utcnow():
            raise HTTPException(status_code=403, detail="Course expired")

    token = create_access_token({
        "sub": user.email,
        "role": user.role
    })

    return {
        "access_token": token,
        "id": user.id,
        "role": user.role,
        "name": user.name,
        "email": user.email,
        
    }