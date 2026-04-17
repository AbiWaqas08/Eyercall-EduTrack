from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Batch(Base):
    __tablename__ = "batches"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100))

    start_date = Column(DateTime)   
    end_date = Column(DateTime)

    course_id = Column(Integer, ForeignKey("courses.id"))

    # relationships
    course = relationship("Course", back_populates="batches")
    students = relationship("User", back_populates="batch")