from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.auth import admin_required, get_current_user
from app.database import get_db
from app.models import Payroll, User
from app.schemas import (
    PayrollCreate,
    PayrollUpdate,
    PayrollResponse
)

router = APIRouter(
    prefix="/payroll",
    tags=["Payroll"]
)


@router.post("/", response_model=PayrollResponse)
def create_payroll(
    payroll: PayrollCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    net_salary = (
        payroll.basic_salary +
        payroll.bonus -
        payroll.deductions
    )

    new_payroll = Payroll(
        employee_name=payroll.employee_name,
        employee_email=payroll.employee_email,
        basic_salary=payroll.basic_salary,
        bonus=payroll.bonus,
        deductions=payroll.deductions,
        net_salary=net_salary
    )

    db.add(new_payroll)
    db.commit()
    db.refresh(new_payroll)

    return new_payroll


@router.get("/", response_model=list[PayrollResponse])
def get_all_payroll(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Payroll).all()


@router.get("/{payroll_id}", response_model=PayrollResponse)
def get_payroll(
    payroll_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    payroll = db.query(Payroll).filter(
        Payroll.id == payroll_id
    ).first()

    if payroll is None:
        raise HTTPException(
            status_code=404,
            detail="Payroll record not found"
        )

    return payroll


@router.put("/{payroll_id}", response_model=PayrollResponse)
def update_payroll(
    payroll_id: int,
    updated_payroll: PayrollUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    payroll = db.query(Payroll).filter(
        Payroll.id == payroll_id
    ).first()

    if payroll is None:
        raise HTTPException(
            status_code=404,
            detail="Payroll record not found"
        )

    payroll.basic_salary = updated_payroll.basic_salary
    payroll.bonus = updated_payroll.bonus
    payroll.deductions = updated_payroll.deductions
    payroll.net_salary = (
        updated_payroll.basic_salary +
        updated_payroll.bonus -
        updated_payroll.deductions
    )

    db.commit()
    db.refresh(payroll)

    return payroll


@router.delete("/{payroll_id}")
def delete_payroll(
    payroll_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    payroll = db.query(Payroll).filter(
        Payroll.id == payroll_id
    ).first()

    if payroll is None:
        raise HTTPException(
            status_code=404,
            detail="Payroll record not found"
        )

    db.delete(payroll)
    db.commit()

    return {
        "message": "Payroll record deleted successfully"
    }