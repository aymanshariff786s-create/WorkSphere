from fastapi import APIRouter, Depends, HTTPException, Query, UploadFile, File
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from sqlalchemy import or_
from openpyxl import Workbook
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle
from reportlab.lib import colors
import os
import shutil

from app.database import get_db
from app.models import Employee, User
from app.schemas import EmployeeCreate, EmployeeUpdate, EmployeeResponse
from app.auth import get_current_user, admin_required

router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)

UPLOAD_FOLDER = "uploads"
EXPORT_FOLDER = "exports"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(EXPORT_FOLDER, exist_ok=True)


@router.post("/", response_model=EmployeeResponse)
def create_employee(
    employee: EmployeeCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    existing = db.query(Employee).filter(
        Employee.email == employee.email
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Employee with this email already exists"
        )

    new_employee = Employee(
        name=employee.name,
        email=employee.email,
        department=employee.department,
        designation=employee.designation,
        photo=""
    )

    db.add(new_employee)
    db.commit()
    db.refresh(new_employee)

    return new_employee


@router.post("/{employee_id}/upload-photo")
def upload_photo(
    employee_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if employee is None:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    filename = f"{employee_id}_{file.filename}"
    filepath = os.path.join(UPLOAD_FOLDER, filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    employee.photo = filepath

    db.commit()
    db.refresh(employee)

    return {
        "message": "Photo uploaded successfully",
        "photo": filepath
    }


@router.get("/export")
def export_employees(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    employees = db.query(Employee).all()

    workbook = Workbook()
    sheet = workbook.active
    sheet.title = "Employees"

    sheet.append([
        "ID",
        "Name",
        "Email",
        "Department",
        "Designation",
        "Photo"
    ])

    for employee in employees:
        sheet.append([
            employee.id,
            employee.name,
            employee.email,
            employee.department,
            employee.designation,
            employee.photo
        ])

    filepath = os.path.join(EXPORT_FOLDER, "employees.xlsx")
    workbook.save(filepath)

    return FileResponse(
        path=filepath,
        filename="employees.xlsx",
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    )


@router.get("/export/pdf")
def export_employees_pdf(
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    employees = db.query(Employee).all()

    filepath = os.path.join(EXPORT_FOLDER, "employees.pdf")

    document = SimpleDocTemplate(filepath)

    data = [[
        "ID",
        "Name",
        "Email",
        "Department",
        "Designation"
    ]]

    for employee in employees:
        data.append([
            employee.id,
            employee.name,
            employee.email,
            employee.department,
            employee.designation
        ])

    table = Table(data)

    table.setStyle(TableStyle([
        ("BACKGROUND", (0,0), (-1,0), colors.grey),
        ("TEXTCOLOR", (0,0), (-1,0), colors.whitesmoke),
        ("GRID", (0,0), (-1,-1), 1, colors.black),
        ("BACKGROUND", (0,1), (-1,-1), colors.beige),
        ("BOTTOMPADDING", (0,0), (-1,0), 10),
    ]))

    document.build([table])

    return FileResponse(
        path=filepath,
        filename="employees.pdf",
        media_type="application/pdf"
    )


@router.get("/", response_model=list[EmployeeResponse])
def get_employees(
    search: str | None = Query(default=None),
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=5, ge=1, le=100),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    query = db.query(Employee)

    if search:
        query = query.filter(
            or_(
                Employee.name.ilike(f"%{search}%"),
                Employee.email.ilike(f"%{search}%"),
                Employee.department.ilike(f"%{search}%"),
                Employee.designation.ilike(f"%{search}%")
            )
        )

    return query.offset((page - 1) * limit).limit(limit).all()


@router.get("/{employee_id}", response_model=EmployeeResponse)
def get_employee(
    employee_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()

    if employee is None:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    return employee


@router.put("/{employee_id}", response_model=EmployeeResponse)
def update_employee(
    employee_id: int,
    updated_employee: EmployeeUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()

    if employee is None:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    employee.name = updated_employee.name
    employee.email = updated_employee.email
    employee.department = updated_employee.department
    employee.designation = updated_employee.designation

    db.commit()
    db.refresh(employee)

    return employee


@router.delete("/{employee_id}")
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(admin_required)
):
    employee = db.query(Employee).filter(Employee.id == employee_id).first()

    if employee is None:
        raise HTTPException(
            status_code=404,
            detail="Employee not found"
        )

    db.delete(employee)
    db.commit()

    return {
        "message": "Employee deleted successfully"
    }