import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getEmployees } from "../services/employeeService";
import { deleteEmployee } from "../services/deleteEmployeeService";
import AddEmployeeDialog from "../components/AddEmployeeDialog";
import EditEmployeeDialog from "../components/EditEmployeeDialog";

import {
  Typography,
  Button,
  Paper,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress
} from "@mui/material";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setOpenEditDialog(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmDelete) return;

    try {
      await deleteEmployee(id);

      alert("Employee deleted successfully!");

      loadEmployees();

    } catch (error) {
      console.error(error);
      alert("Failed to delete employee");
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
        <Typography variant="h4" fontWeight="bold">
          Employees
        </Typography>

        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
        >
          Add Employee
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
                <TableCell><b>Name</b></TableCell>
                <TableCell><b>Email</b></TableCell>
                <TableCell><b>Department</b></TableCell>
                <TableCell><b>Designation</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>

            </TableHead>

            <TableBody>

              {employees.map((employee) => (

                <TableRow key={employee.id}>

                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.designation}</TableCell>

                  <TableCell>

                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEdit(employee)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(employee.id)}
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

      <AddEmployeeDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        refreshEmployees={loadEmployees}
      />

      <EditEmployeeDialog
        open={openEditDialog}
        handleClose={() => setOpenEditDialog(false)}
        employee={selectedEmployee}
        refreshEmployees={loadEmployees}
      />

    </DashboardLayout>
  );
}

export default Employees;