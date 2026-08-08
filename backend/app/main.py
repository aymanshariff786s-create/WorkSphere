from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app.models import Base
from app.routers import (
    auth,
    employees,
    departments,
    leave,
    attendance,
    dashboard,
    payroll,
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="WorkSphere API",
    version="1.0.0"
)

# ==========================
# CORS Configuration
# ==========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Welcome to WorkSphere 🚀"
    }


@app.get("/health")
def health():
    try:
        connection = engine.connect()
        connection.close()

        return {
            "database": "Connected ✅"
        }

    except Exception as e:
        return {
            "database": "Connection Failed ❌",
            "error": str(e)
        }


# ==========================
# Serve Uploaded Images
# ==========================

app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")


# ==========================
# Routers
# ==========================

app.include_router(auth.router)
app.include_router(employees.router)
app.include_router(departments.router)
app.include_router(leave.router)
app.include_router(attendance.router)
app.include_router(dashboard.router)
app.include_router(payroll.router)