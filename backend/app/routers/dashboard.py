from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth import admin_required
from app.database import get_db
from app.models import Employee, Department, Leave, Attendance, User
from app.schemas import DashboardResponse

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/", response_model=DashboardResponse)
def get_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    total_employees = db.query(Employee).count()

    total_departments = db.query(Department).count()

    total_leave_requests = db.query(Leave).count()

    pending_leave_requests = db.query(Leave).filter(
        Leave.status == "Pending"
    ).count()

    approved_leave_requests = db.query(Leave).filter(
        Leave.status == "Approved"
    ).count()

    rejected_leave_requests = db.query(Leave).filter(
        Leave.status == "Rejected"
    ).count()

    total_attendance = db.query(Attendance).count()

    return {
        "total_employees": total_employees,
        "total_departments": total_departments,
        "total_leave_requests": total_leave_requests,
        "pending_leave_requests": pending_leave_requests,
        "approved_leave_requests": approved_leave_requests,
        "rejected_leave_requests": rejected_leave_requests,
        "total_attendance": total_attendance
    }