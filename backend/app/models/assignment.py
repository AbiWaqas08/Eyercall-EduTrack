from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
import datetime


class Assignment(Base):
    # table name
    __tablename__ = "assignments"
    # columns
    id = Column()
    title = Column()
    description = Column()

    # forign key
    course_id = Column(Integer, ForeignKey("course.id"))
    batch_id = Column(Integer, ForeignKey("batches.id"))

    due_date = Column(DateTime)
    creaated_at = Column(DateTime, default=datetime.datetime.utcnow)

    # realationships
    submission = relationship("submission", back_populates="assignment")