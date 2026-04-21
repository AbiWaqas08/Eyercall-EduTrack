from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
import datetime


class Assignment(Base):
    # table name
    __tablename__ = "assignments"
    # columns
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200))
    description = Column(String(500))

    # forign key
    course_id = Column(Integer, ForeignKey("courses.id"))
    batch_id = Column(Integer, ForeignKey("batches.id"))

    due_date = Column(DateTime)
    creaated_at = Column(DateTime, default=datetime.datetime.utcnow)

    # realationships
    # submission = relationship("submission", back_populates="assignment")