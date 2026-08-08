import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert
} from "@mui/material";

import { addEmployee } from "../services/addEmployeeService";

function AddEmployeeDialog({
  open,
  handleClose,
  refreshEmployees
}) {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: "",
    designation: ""
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: ""
  });

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false
    }));
  };

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      await addEmployee(employee);

      setEmployee({
        name: "",
        email: "",
        department: "",
        designation: ""
      });

      refreshEmployees();

      setSnackbar({
        open: true,
        severity: "success",
        message: "Employee added successfully!"
      });

      handleClose();

    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        severity: "error",
        message: "Failed to add employee"
      });
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Add Employee</DialogTitle>

        <DialogContent>

          <TextField
            margin="normal"
            fullWidth
            label="Name"
            name="name"
            value={employee.name}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            value={employee.email}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Department"
            name="department"
            value={employee.department}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Designation"
            name="designation"
            value={employee.designation}
            onChange={handleChange}
          />

        </DialogContent>

        <DialogActions>

          <Button onClick={handleClose}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
          >
            Save
          </Button>

        </DialogActions>

      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default AddEmployeeDialog;