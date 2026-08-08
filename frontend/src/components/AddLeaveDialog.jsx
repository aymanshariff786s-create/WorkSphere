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

import { addLeave } from "../services/leaveService";

function AddLeaveDialog({
  open,
  handleClose,
  refreshLeaves
}) {
  const [leave, setLeave] = useState({
    employee_name: "",
    employee_email: "",
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: ""
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
    setLeave({
      ...leave,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      await addLeave(leave);

      setLeave({
        employee_name: "",
        employee_email: "",
        leave_type: "",
        start_date: "",
        end_date: "",
        reason: ""
      });

      refreshLeaves();

      setSnackbar({
        open: true,
        severity: "success",
        message: "Leave applied successfully!"
      });

      handleClose();

    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        severity: "error",
        message: "Failed to apply leave"
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
        <DialogTitle>Apply Leave</DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            margin="normal"
            label="Employee Name"
            name="employee_name"
            value={leave.employee_name}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Employee Email"
            name="employee_email"
            value={leave.employee_email}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Leave Type"
            name="leave_type"
            value={leave.leave_type}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Start Date"
            type="date"
            name="start_date"
            value={leave.start_date}
            onChange={handleChange}
            slotProps={{
              inputLabel: {
                shrink: true
              }
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="End Date"
            type="date"
            name="end_date"
            value={leave.end_date}
            onChange={handleChange}
            slotProps={{
              inputLabel: {
                shrink: true
              }
            }}
          />

          <TextField
            fullWidth
            margin="normal"
            label="Reason"
            name="reason"
            multiline
            rows={3}
            value={leave.reason}
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
            Apply
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

export default AddLeaveDialog;