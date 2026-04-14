from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base


# Database url

DATABASE_URL = "mysql+pymysql://root:123456@localhost/eyercall_lms"

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