from pydantic import BaseModel, EmailStr


# =====================================
# Employee Schemas
# =====================================

class EmployeeCreate(BaseModel):
    name: str
    email: EmailStr
    department: str
    designation: str


class EmployeeUpdate(BaseModel):
    name: str
    email: EmailStr
    department: str
    designation: str


class EmployeeResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    department: str
    designation: str
    photo: str

    class Config:
        from_attributes = True


# =====================================
# User Schemas
# =====================================

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    role: str

    class Config:
        from_attributes = True


# =====================================
# Department Schemas
# =====================================

class DepartmentCreate(BaseModel):
    name: str
    description: str


class DepartmentUpdate(BaseModel):
    name: str
    description: str


class DepartmentResponse(BaseModel):
    id: int
    name: str
    description: str

    class Config:
        from_attributes = True


# =====================================
# Leave Schemas
# =====================================

class LeaveCreate(BaseModel):
    employee_name: str
    employee_email: EmailStr
    leave_type: str
    start_date: str
    end_date: str
    reason: str


class LeaveUpdate(BaseModel):
    status: str


class LeaveResponse(BaseModel):
    id: int
    employee_name: str
    employee_email: EmailStr
    leave_type: str
    start_date: str
    end_date: str
    reason: str
    status: str

    class Config:
        from_attributes = True


# =====================================
# Attendance Schemas
# =====================================

class AttendanceCreate(BaseModel):
    employee_name: str
    employee_email: EmailStr
    date: str
    check_in: str


class AttendanceUpdate(BaseModel):
    check_out: str


class AttendanceResponse(BaseModel):
    id: int
    employee_name: str
    employee_email: str
    date: str
    check_in: str
    check_out: str

    class Config:
        from_attributes = True


# =====================================
# Payroll Schemas
# =====================================

class PayrollCreate(BaseModel):
    employee_name: str
    employee_email: EmailStr
    basic_salary: float
    bonus: float
    deductions: float


class PayrollUpdate(BaseModel):
    basic_salary: float
    bonus: float
    deductions: float


class PayrollResponse(BaseModel):
    id: int
    employee_name: str
    employee_email: EmailStr
    basic_salary: float
    bonus: float
    deductions: float
    net_salary: float

    class Config:
        from_attributes = True


# =====================================
# Dashboard Schema
# =====================================

class DashboardResponse(BaseModel):
    total_employees: int
    total_departments: int
    total_leave_requests: int
    pending_leave_requests: int
    approved_leave_requests: int
    rejected_leave_requests: int
    total_attendance: int