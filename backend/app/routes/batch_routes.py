from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.batch import Batch
from app.schemas.batch import Batchcreate

# define router
router = APIRouter(prefix="/batches", tags=["Batches"])

# create 
@router.post("/")
def create_batch(batch: Batchcreate, db: Session = Depends(get_db)):
    new_batch = Batch(**batch.dict())
    db.add(new_batch)
    db.commit()
    db.refresh(new_batch)
    return(new_batch)

# get all batch
@router.get("/")
def get_batch(db: Session = Depends(get_db)):
    return db.query(Batch).all()