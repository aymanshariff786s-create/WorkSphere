import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getLeaves,
  updateLeave,
  deleteLeave
} from "../services/leaveService";
import AddLeaveDialog from "../components/AddLeaveDialog";

import {
  Typography,
  Paper,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Button,
  Snackbar,
  Alert
} from "@mui/material";

function Leave() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: "success",
    message: ""
  });

  useEffect(() => {
    loadLeaves();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false
    }));
  };

  const loadLeaves = async () => {
    try {
      setLoading(true);

      const data = await getLeaves();

      setLeaves(data);

    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        severity: "error",
        message: "Failed to load leave records"
      });

    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (id, status) => {
    try {
      await updateLeave(id, status);

      setSnackbar({
        open: true,
        severity: "success",
        message: `Leave ${status}`
      });

      loadLeaves();

    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        severity: "error",
        message: "Failed to update leave"
      });
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this leave request?"
    );

    if (!confirmDelete) return;

    try {
      await deleteLeave(id);

      setSnackbar({
        open: true,
        severity: "success",
        message: "Leave deleted successfully!"
      });

      loadLeaves();

    } catch (error) {
      console.error(error);

      setSnackbar({
        open: true,
        severity: "error",
        message: "Failed to delete leave"
      });
    }
  };

  return (
    <DashboardLayout>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
        >
          Leave Management
        </Typography>

        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
        >
          Apply Leave
        </Button>

      </Box>

      <Paper sx={{ p: 2 }}>

        {loading ? (

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              p: 4
            }}
          >
            <CircularProgress />
          </Box>

        ) : (

          <Table>

            <TableHead>

              <TableRow>
                <TableCell><b>ID</b></TableCell>
                <TableCell><b>Employee</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Leave Type</b></TableCell>
                <TableCell><b>Start Date</b></TableCell>
                <TableCell><b>End Date</b></TableCell>
                <TableCell><b>Reason</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>

            </TableHead>

            <TableBody>

              {leaves.map((leave) => (

                <TableRow key={leave.id}>

                  <TableCell>{leave.id}</TableCell>
                  <TableCell>{leave.employee_name}</TableCell>
                  <TableCell>{leave.employee_email}</TableCell>
                  <TableCell>{leave.leave_type}</TableCell>
                  <TableCell>{leave.start_date}</TableCell>
                  <TableCell>{leave.end_date}</TableCell>
                  <TableCell>{leave.reason}</TableCell>
                  <TableCell>{leave.status}</TableCell>

                  <TableCell>

                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                      onClick={() =>
                        changeStatus(leave.id, "Approved")
                      }
                    >
                      Approve
                    </Button>

                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                      onClick={() =>
                        changeStatus(leave.id, "Rejected")
                      }
                    >
                      Reject
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ mb: 1 }}
                      onClick={() =>
                        handleDelete(leave.id)
                      }
                    >
                      Delete
                    </Button>

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        )}

      </Paper>

      <AddLeaveDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        refreshLeaves={loadLeaves}
      />

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

    </DashboardLayout>
  );
}

export default Leave;