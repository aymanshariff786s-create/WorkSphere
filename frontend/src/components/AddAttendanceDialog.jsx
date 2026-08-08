import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField
} from "@mui/material";

import { addAttendance } from "../services/addAttendanceService";

function AddAttendanceDialog({
  open,
  handleClose
}) {
  const [attendance, setAttendance] = useState({
    employee_name: "",
    employee_email: "",
    date: "",
    check_in: ""
  });

  const handleChange = (e) => {
    setAttendance({
      ...attendance,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      await addAttendance(attendance);

      alert("Attendance marked successfully!");

      setAttendance({
        employee_name: "",
        employee_email: "",
        date: "",
        check_in: ""
      });

      handleClose();

    } catch (error) {
      console.error(error);
      alert("Failed to mark attendance");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Mark Attendance</DialogTitle>

      <DialogContent>

        <TextField
          fullWidth
          margin="normal"
          label="Employee Name"
          name="employee_name"
          value={attendance.employee_name}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Employee Email"
          name="employee_email"
          value={attendance.employee_email}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Date"
          type="date"
          name="date"
          value={attendance.date}
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
          label="Check In"
          type="time"
          name="check_in"
          value={attendance.check_in}
          onChange={handleChange}
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
          onClick={handleSave}
        >
          Save
        </Button>

      </DialogActions>

    </Dialog>
  );
}

export default AddAttendanceDialog;