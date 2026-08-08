import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getAttendance } from "../services/attendanceService";
import { deleteAttendance } from "../services/deleteAttendanceService";
import AddAttendanceDialog from "../components/AddAttendanceDialog";
import EditAttendanceDialog from "../components/EditAttendanceDialog";

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
  Button
} from "@mui/material";

function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [selectedAttendance, setSelectedAttendance] = useState(null);

  useEffect(() => {
    loadAttendance();
  }, []);

  const loadAttendance = async () => {
    try {
      setLoading(true);

      const data = await getAttendance();

      setAttendance(data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setSelectedAttendance(record);
    setOpenEditDialog(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this attendance record?"
    );

    if (!confirmDelete) return;

    try {
      await deleteAttendance(id);

      alert("Attendance deleted successfully!");

      loadAttendance();

    } catch (error) {
      console.error(error);
      alert("Failed to delete attendance");
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
          Attendance
        </Typography>

        <Button
          variant="contained"
          onClick={() => setOpenAddDialog(true)}
        >
          Mark Attendance
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
                <TableCell><b>Date</b></TableCell>
                <TableCell><b>Check In</b></TableCell>
                <TableCell><b>Check Out</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>

            </TableHead>

            <TableBody>

              {attendance.map((record) => (

                <TableRow key={record.id}>

                  <TableCell>{record.id}</TableCell>

                  <TableCell>{record.employee_name}</TableCell>

                  <TableCell>{record.employee_email}</TableCell>

                  <TableCell>{record.date}</TableCell>

                  <TableCell>{record.check_in}</TableCell>

                  <TableCell>{record.check_out || "-"}</TableCell>

                  <TableCell>

                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleEdit(record)}
                    >
                      Check Out
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(record.id)}
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

      <AddAttendanceDialog
        open={openAddDialog}
        handleClose={() => setOpenAddDialog(false)}
      />

      <EditAttendanceDialog
        open={openEditDialog}
        handleClose={() => setOpenEditDialog(false)}
        attendance={selectedAttendance}
        refreshAttendance={loadAttendance}
      />

    </DashboardLayout>
  );
}

export default Attendance;