from fastapi import FastAPI
from app.database import Base, engine
from app.routes import auth


app =FastAPI()

Base.metadata.create_all(bind= engine)


# Add auth routes in main file

app.include_router(auth.router, prefix="/auth", tags=["Auth"])

@app.get("/")
def api_check():
    return{"message": "api is working"}