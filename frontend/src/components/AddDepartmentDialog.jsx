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

import { addDepartment } from "../services/departmentService";

function AddDepartmentDialog({
  open,
  handleClose,
  refreshDepartments
}) {
  const [department, setDepartment] = useState({
    name: "",
    description: ""
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
    setDepartment({
      ...department,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      await addDepartment(department);

      setDepartment({
        name: "",
        description: ""
      });

      refreshDepartments();

      setSnackbar({
        open: true,
        severity: "success",
        message: "Department added successfully!"
      });

      handleClose();

    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        severity: "error",
        message: "Failed to add department"
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
        <DialogTitle>Add Department</DialogTitle>

        <DialogContent>

          <TextField
            margin="normal"
            fullWidth
            label="Department Name"
            name="name"
            value={department.name}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Description"
            name="description"
            value={department.description}
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

export default AddDepartmentDialog;