import { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Box
} from "@mui/material";

import DashboardLayout from "../layouts/DashboardLayout";
import { getDashboardStats } from "../services/dashboardService";

function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!stats) {
    return (
      <DashboardLayout>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 10
          }}
        >
          <CircularProgress />
        </Box>
      </DashboardLayout>
    );
  }

  const cards = [
    {
      title: "Employees",
      value: stats.total_employees
    },
    {
      title: "Departments",
      value: stats.total_departments
    },
    {
      title: "Leave Requests",
      value: stats.total_leave_requests
    },
    {
      title: "Attendance",
      value: stats.total_attendance
    }
  ];

  return (
    <DashboardLayout>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={4}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            key={card.title}
          >
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                borderRadius: 3
              }}
            >
              <Typography variant="h6">
                {card.title}
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
                mt={2}
              >
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </DashboardLayout>
  );
}

export default Dashboard;