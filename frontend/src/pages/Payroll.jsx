import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getPayroll } from "../services/payrollService";
import { deletePayroll } from "../services/deletePayrollService";

import AddPayrollDialog from "../components/AddPayrollDialog";
import EditPayrollDialog from "../components/EditPayrollDialog";

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

function Payroll() {
  const [payroll, setPayroll] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [selectedPayroll, setSelectedPayroll] = useState(null);

  useEffect(() => {
    loadPayroll();
  }, []);

  const loadPayroll = async () => {
    try {
      setLoading(true);

      const data = await getPayroll();

      setPayroll(data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record) => {
    setSelectedPayroll(record);
    setOpenEditDialog(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this payroll record?"
    );

    if (!confirmDelete) return;

    try {
      await deletePayroll(id);

      alert("Payroll deleted successfully!");

      loadPayroll();

    } catch (error) {
      console.error(error);
      alert("Failed to delete payroll");
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
          Payroll
        </Typography>

        <Button
          variant="contained"
          onClick={() => setOpenAddDialog(true)}
        >
          Add Payroll
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
                <TableCell><b>Basic Salary</b></TableCell>
                <TableCell><b>Bonus</b></TableCell>
                <TableCell><b>Deductions</b></TableCell>
                <TableCell><b>Net Salary</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>

            </TableHead>

            <TableBody>

              {payroll.map((record) => (

                <TableRow key={record.id}>

                  <TableCell>{record.id}</TableCell>
                  <TableCell>{record.employee_name}</TableCell>
                  <TableCell>{record.employee_email}</TableCell>
                  <TableCell>{record.basic_salary}</TableCell>
                  <TableCell>{record.bonus}</TableCell>
                  <TableCell>{record.deductions}</TableCell>
                  <TableCell>{record.net_salary}</TableCell>

                  <TableCell>

                    <Button
                      variant="contained"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleEdit(record)}
                    >
                      Edit
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

      <AddPayrollDialog
        open={openAddDialog}
        handleClose={() => setOpenAddDialog(false)}
        refreshPayroll={loadPayroll}
      />

      <EditPayrollDialog
        open={openEditDialog}
        handleClose={() => setOpenEditDialog(false)}
        payroll={selectedPayroll}
        refreshPayroll={loadPayroll}
      />

    </DashboardLayout>
  );
}

export default Payroll;