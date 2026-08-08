from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth import admin_required, get_current_user
from app.database import get_db
from app.models import Leave, User
from app.schemas import (
    LeaveCreate,
    LeaveUpdate,
    LeaveResponse
)

router = APIRouter(
    prefix="/leaves",
    tags=["Leave Management"]
)


@router.post("/", response_model=LeaveResponse)
def apply_leave(
    leave: LeaveCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_leave = Leave(
        employee_name=leave.employee_name,
        employee_email=leave.employee_email,
        leave_type=leave.leave_type,
        start_date=leave.start_date,
        end_date=leave.end_date,
        reason=leave.reason,
        status="Pending"
    )

    db.add(new_leave)
    db.commit()
    db.refresh(new_leave)

    return new_leave


@router.get("/", response_model=list[LeaveResponse])
def get_all_leaves(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Leave).all()


@router.get("/{leave_id}", response_model=LeaveResponse)
def get_leave(
    leave_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    leave = db.query(Leave).filter(
        Leave.id == leave_id
    ).first()

    if leave is None:
        raise HTTPException(
            status_code=404,
            detail="Leave request not found"
        )

    return leave


@router.put("/{leave_id}", response_model=LeaveResponse)
def update_leave_status(
    leave_id: int,
    updated_leave: LeaveUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    leave = db.query(Leave).filter(
        Leave.id == leave_id
    ).first()

    if leave is None:
        raise HTTPException(
            status_code=404,
            detail="Leave request not found"
        )

    leave.status = updated_leave.status

    db.commit()
    db.refresh(leave)

    return leave


@router.delete("/{leave_id}")
def delete_leave(
    leave_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    leave = db.query(Leave).filter(
        Leave.id == leave_id
    ).first()

    if leave is None:
        raise HTTPException(
            status_code=404,
            detail="Leave request not found"
        )

    db.delete(leave)
    db.commit()

    return {
        "message": "Leave request deleted successfully"
    }