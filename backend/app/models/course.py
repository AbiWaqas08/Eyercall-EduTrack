from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app. database import Base


# course class
class Course(Base):
    # table name
    __tablename__ = "courses"

    # table columns
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), unique=True)
    description = Column(String(255), nullable=True)
    duration_days = Column(Integer)

    # relationships
    students = relationship("User", back_populates="course")
    batches = relationship("Batch", back_populates="course")