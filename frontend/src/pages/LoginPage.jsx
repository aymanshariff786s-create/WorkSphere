import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  TextField,
  Typography,
  Alert
} from "@mui/material";

import api from "../services/api";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const login = async () => {
    try {
      const formData = new URLSearchParams();

      formData.append("username", email);
      formData.append("password", password);

      const response = await api.post(
        "/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      setMessage("Login Successful ✅");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      setMessage("Invalid Email or Password ❌");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Card sx={{ width: "100%", p: 2 }}>
          <CardContent>

            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              gutterBottom
            >
              WorkSphere
            </Typography>

            <Typography
              align="center"
              color="text.secondary"
              mb={3}
            >
              Employee Management System
            </Typography>

            {message && (
              <Alert
                severity={
                  message.includes("Successful")
                    ? "success"
                    : "error"
                }
                sx={{ mb: 2 }}
              >
                {message}
              </Alert>
            )}

            <TextField
              label="Email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 3 }}
              onClick={login}
            >
              LOGIN
            </Button>

          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}

export default LoginPage;