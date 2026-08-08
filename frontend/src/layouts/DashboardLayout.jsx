import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          bgcolor: "#f5f5f5",
          minHeight: "100vh"
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default DashboardLayout;