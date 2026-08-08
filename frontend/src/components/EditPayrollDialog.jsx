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

import { updatePayroll } from "../services/editPayrollService";

function EditPayrollDialog({
  open,
  handleClose,
  payroll,
  refreshPayroll
}) {
  const [formData, setFormData] = useState({
    basic_salary: "",
    bonus: "",
    deductions: ""
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: ""
  });

  useEffect(() => {
    if (payroll) {
      setFormData({
        basic_salary: payroll.basic_salary || "",
        bonus: payroll.bonus || "",
        deductions: payroll.deductions || ""
      });
    }
  }, [payroll]);

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
      await updatePayroll(payroll.id, {
        basic_salary: Number(formData.basic_salary),
        bonus: Number(formData.bonus),
        deductions: Number(formData.deductions)
      });

      refreshPayroll();

      setSnackbar({
        open: true,
        severity: "success",
        message: "Payroll updated successfully!"
      });

      handleClose();

    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        severity: "error",
        message: "Failed to update payroll"
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
        <DialogTitle>Edit Payroll</DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            margin="normal"
            label="Basic Salary"
            name="basic_salary"
            type="number"
            value={formData.basic_salary}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Bonus"
            name="bonus"
            type="number"
            value={formData.bonus}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Deductions"
            name="deductions"
            type="number"
            value={formData.deductions}
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

export default EditPayrollDialog;