# WorkSphere

WorkSphere is a full-stack Employee Management System designed to manage employees, departments, leave requests, attendance, and payroll from a centralized dashboard.

## 🚀 Features

### Authentication
- User login with JWT authentication
- Protected application routes
- Logout functionality
- Authorization for protected API endpoints

### Employee Management
- Add employees
- View employees
- Edit employee information
- Delete employees

### Department Management
- Add departments
- View departments
- Edit departments
- Delete departments

### Leave Management
- Apply for leave
- View leave requests
- Approve leave requests
- Reject leave requests
- Delete leave requests

### Attendance Management
- Mark employee attendance
- Record check-in time
- Update check-out time
- Delete attendance records

### Payroll Management
- Add payroll records
- Calculate net salary
- Edit payroll records
- Delete payroll records

### Dashboard
- Centralized management dashboard
- Employee and management information
- Navigation through all major modules

### User Interface
- Responsive React interface
- Material UI components
- Dialog-based forms
- Snackbar notifications
- Loading indicators
- Confirmation dialogs

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Material UI
- Axios
- React Router

### Backend

- Python
- FastAPI
- SQLAlchemy
- Pydantic
- JWT Authentication
- Uvicorn

### Database

- PostgreSQL

### Development Tools

- Git
- GitHub
- VS Code

---

## 📁 Project Structure

```text
WorkSphere/
│
├── backend/
│   ├── app/
│   │   ├── routers/
│   │   ├── auth.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   │
│   ├── exports/
│   ├── uploads/
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── services/
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── README.md