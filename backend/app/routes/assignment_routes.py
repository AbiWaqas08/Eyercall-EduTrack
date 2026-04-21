from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.assignment import Assignment
from app.schemas.assignment import AssignmentCreate


router = APIRouter(prefix="/assignments", tags=["assignments"])

# create assignment
router.post("/")
def create_assignment(data: AssignmentCreate, db: Session = Depends(get_db)):

    assignment = Assignment(**data.dict())

    db.add(assignment)
    db.commit()
    db.refresh(assignment)

    return {
        "message": "Assignemnt created",
        "assignment" : assignment
    }


# get all assignmnets
router.get("/")
def get_assignmnets(db : Session = Depends(get_db)):
    return db.query(Assignment).all()
