import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  getDepartments
} from "../services/departmentService";
import {
  deleteDepartment
} from "../services/deleteDepartmentService";

import AddDepartmentDialog from "../components/AddDepartmentDialog";
import EditDepartmentDialog from "../components/EditDepartmentDialog";

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

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState(null);

  useEffect(() => {
    loadDepartments();
  }, []);

  const loadDepartments = async () => {
    try {
      setLoading(true);

      const data = await getDepartments();

      setDepartments(data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (department) => {
    setSelectedDepartment(department);
    setOpenEditDialog(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this department?"
    );

    if (!confirmDelete) return;

    try {
      await deleteDepartment(id);

      alert("Department deleted successfully!");

      loadDepartments();

    } catch (error) {
      console.error(error);
      alert("Failed to delete department");
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
          Departments
        </Typography>

        <Button
          variant="contained"
          onClick={() => setOpenDialog(true)}
        >
          Add Department
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
                <TableCell><b>Description</b></TableCell>
                <TableCell><b>Actions</b></TableCell>
              </TableRow>

            </TableHead>

            <TableBody>

              {departments.map((department) => (

                <TableRow key={department.id}>

                  <TableCell>{department.id}</TableCell>

                  <TableCell>{department.name}</TableCell>

                  <TableCell>{department.description}</TableCell>

                  <TableCell>

                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEdit(department)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(department.id)}
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

      <AddDepartmentDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        refreshDepartments={loadDepartments}
      />

      <EditDepartmentDialog
        open={openEditDialog}
        handleClose={() => setOpenEditDialog(false)}
        department={selectedDepartment}
        refreshDepartments={loadDepartments}
      />

    </DashboardLayout>
  );
}

export default Departments;