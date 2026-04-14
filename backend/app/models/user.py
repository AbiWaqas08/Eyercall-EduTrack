
from sqlalchemy import Column, Integer, String
from app.database import Base

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

    
