from fastapi import FastAPI
from app.database import Base, engine
from app.routes import auth
from app.routes import batch_routes
from app.routes import course_routes

from app.models import user, course, batch

app =FastAPI()

Base.metadata.create_all(bind= engine)


# auth routes in main file
app.include_router(auth.router)

app.include_router(course_routes.router)

app.include_router(batch_routes.router)

@app.get("/")
def api_check():
    return{"message": "api is working"}

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)