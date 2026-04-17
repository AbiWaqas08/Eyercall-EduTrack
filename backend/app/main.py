from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# import routers
from app.routes import auth
from app.routes import student_routes
from app.routes import course_routes
from app.routes import batch_routes

# create app
app = FastAPI()

# ✅ CORS CONFIG (IMPORTANT)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ ROUTES REGISTER
app.include_router(auth.router, prefix="/auth")
app.include_router(student_routes.router)
app.include_router(course_routes.router)
app.include_router(batch_routes.router)


# ✅ TEST ROUTE
@app.get("/")
def home():
    return {"message": "LMS Backend Running"}