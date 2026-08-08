import { useState, useEffect } from "react";
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

import { updateEmployee } from "../services/editEmployeeService";

function EditEmployeeDialog({
  open,
  handleClose,
  employee,
  refreshEmployees
}) {
  const [formData, setFormData] = useState({
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

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        department: employee.department || "",
        designation: employee.designation || ""
      });
    }
  }, [employee]);

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false
    }));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async () => {
    try {
      await updateEmployee(employee.id, formData);

      refreshEmployees();

      setSnackbar({
        open: true,
        severity: "success",
        message: "Employee updated successfully!"
      });

      handleClose();

    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        severity: "error",
        message: "Failed to update employee"
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
        <DialogTitle>Edit Employee</DialogTitle>

        <DialogContent>

          <TextField
            margin="normal"
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
          />

        </DialogContent>

        <DialogActions>

          <Button onClick={handleClose}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleUpdate}
          >
            Update
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

export default EditEmployeeDialog;