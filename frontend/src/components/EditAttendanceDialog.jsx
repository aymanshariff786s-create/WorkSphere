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

import { updateAttendance } from "../services/editAttendanceService";

function EditAttendanceDialog({
  open,
  handleClose,
  attendance,
  refreshAttendance
}) {
  const [checkOut, setCheckOut] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: ""
  });

  useEffect(() => {
    if (attendance) {
      setCheckOut(attendance.check_out || "");
    }
  }, [attendance]);

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateAttendance(attendance.id, {
        check_out: checkOut
      });

      refreshAttendance();

      setSnackbar({
        open: true,
        severity: "success",
        message: "Attendance updated successfully!"
      });

      handleClose();

    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        severity: "error",
        message: "Failed to update attendance"
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
        <DialogTitle>Check Out</DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            margin="normal"
            label="Check Out Time"
            type="time"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            slotProps={{
              inputLabel: {
                shrink: true
              }
            }}
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

export default EditAttendanceDialog;