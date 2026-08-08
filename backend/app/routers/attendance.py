from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth import admin_required, get_current_user
from app.database import get_db
from app.models import Attendance, User
from app.schemas import (
    AttendanceCreate,
    AttendanceUpdate,
    AttendanceResponse
)

router = APIRouter(
    prefix="/attendance",
    tags=["Attendance"]
)


@router.post("/", response_model=AttendanceResponse)
def check_in(
    attendance: AttendanceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_attendance = Attendance(
        employee_name=attendance.employee_name,
        employee_email=attendance.employee_email,
        date=attendance.date,
        check_in=attendance.check_in,
        check_out=""
    )

    db.add(new_attendance)
    db.commit()
    db.refresh(new_attendance)

    return new_attendance


@router.get("/", response_model=list[AttendanceResponse])
def get_attendance(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Attendance).all()


@router.get("/{attendance_id}", response_model=AttendanceResponse)
def get_attendance_by_id(
    attendance_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    attendance = db.query(Attendance).filter(
        Attendance.id == attendance_id
    ).first()

    if attendance is None:
        raise HTTPException(
            status_code=404,
            detail="Attendance record not found"
        )

    return attendance


@router.put("/{attendance_id}", response_model=AttendanceResponse)
def check_out(
    attendance_id: int,
    updated_attendance: AttendanceUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    attendance = db.query(Attendance).filter(
        Attendance.id == attendance_id
    ).first()

    if attendance is None:
        raise HTTPException(
            status_code=404,
            detail="Attendance record not found"
        )

    attendance.check_out = updated_attendance.check_out

    db.commit()
    db.refresh(attendance)

    return attendance


@router.delete("/{attendance_id}")
def delete_attendance(
    attendance_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    attendance = db.query(Attendance).filter(
        Attendance.id == attendance_id
    ).first()

    if attendance is None:
        raise HTTPException(
            status_code=404,
            detail="Attendance record not found"
        )

    db.delete(attendance)
    db.commit()

    return {
        "message": "Attendance record deleted successfully"
    }