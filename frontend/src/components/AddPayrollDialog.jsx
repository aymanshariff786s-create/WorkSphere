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

import { addPayroll } from "../services/payrollService";

function AddPayrollDialog({
  open,
  handleClose,
  refreshPayroll
}) {
  const [payroll, setPayroll] = useState({
    employee_name: "",
    employee_email: "",
    basic_salary: "",
    bonus: "",
    deductions: ""
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
    setPayroll({
      ...payroll,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      await addPayroll({
        ...payroll,
        basic_salary: Number(payroll.basic_salary),
        bonus: Number(payroll.bonus),
        deductions: Number(payroll.deductions)
      });

      setPayroll({
        employee_name: "",
        employee_email: "",
        basic_salary: "",
        bonus: "",
        deductions: ""
      });

      if (refreshPayroll) {
        refreshPayroll();
      }

      setSnackbar({
        open: true,
        severity: "success",
        message: "Payroll added successfully!"
      });

      handleClose();

    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        severity: "error",
        message: "Failed to add payroll"
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
        <DialogTitle>Add Payroll</DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            margin="normal"
            label="Employee Name"
            name="employee_name"
            value={payroll.employee_name}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Employee Email"
            name="employee_email"
            value={payroll.employee_email}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Basic Salary"
            name="basic_salary"
            type="number"
            value={payroll.basic_salary}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Bonus"
            name="bonus"
            type="number"
            value={payroll.bonus}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Deductions"
            name="deductions"
            type="number"
            value={payroll.deductions}
            onChange={handleChange}
          />

        </DialogContent>

        <DialogActions>

          <Button onClick={handleClose}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSave}
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

export default AddPayrollDialog;