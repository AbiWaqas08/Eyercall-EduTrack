from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import DATABASE_URL

# create engine
engine = create_engine(DATABASE_URL)

# create session

SessionLocal = sessionmaker(bind=engine,
                        autocommit= False,
                        autoflush=False)

Base = declarative_base()

# function to get databse

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()