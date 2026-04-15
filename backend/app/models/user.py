
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.database import Base
import datetime

class User(Base):
    # table name
    __tablename__ = "users"

    # colums of table
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))
    email = Column(String(100), unique=True, index=True)
    password = Column(String(255))
    # role = admin / student
    role = Column(String(100))


    #  LMS FIELDS
    course_id = Column(Integer, ForeignKey("courses.id"), nullable=True)
    batch_id = Column(Integer, ForeignKey("batches.id"), nullable=True)

    fee = Column(Integer, default=0)
    fee_status = Column(String(20), default="pending")

    course_end_date = Column(DateTime, nullable=True)

    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    # relationships
    course = relationship("Course", back_populates="students")
    batch = relationship("Batch", back_populates="students")
    
