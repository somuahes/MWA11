import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../services/api"; // Add this import

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Alert,
} from "@mui/material";

function Login() {
  const [mode, setMode] = useState("login"); // 'login' or 'register'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let response;
      
      if (mode === "login") {
        // Login
        response = await login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        // Register
        response = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      }

      // Save token and user data
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response));
      
      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        px: 2,
        background:
          "radial-gradient(1200px 600px at 10% 10%, rgba(25,118,210,0.18), transparent 60%), radial-gradient(900px 500px at 90% 20%, rgba(156,39,176,0.14), transparent 60%), #f7f7fb",
      }}
    >
      <Card
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: 430,
          borderRadius: 4,
          boxShadow: "0 14px 40px rgba(0,0,0,0.08)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={0.7} sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 900 }}>
              Inventory Management System
            </Typography>
            <Typography color="text.secondary">
              {mode === "login" ? "Login to continue" : "Create a new account"}
            </Typography>
          </Stack>

          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(e, newMode) => newMode && setMode(newMode)}
            fullWidth
            sx={{ mb: 2 }}
          >
            <ToggleButton value="login">Login</ToggleButton>
            <ToggleButton value="register">Register</ToggleButton>
          </ToggleButtonGroup>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              {mode === "register" && (
                <TextField
                  name="name"
                  label="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  fullWidth
                  required
                />
              )}

              <TextField
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                required
              />

              <TextField
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
                required
                helperText={mode === "register" ? "Minimum 6 characters" : ""}
              />

              <Button 
                type="submit" 
                variant="contained" 
                size="large"
                disabled={loading}
              >
                {loading ? "Processing..." : mode === "login" ? "Login" : "Register"}
              </Button>
            </Stack>
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 3 }}
          >
            {mode === "login" 
              ? "Demo credentials: test@test.com / password123" 
              : "Create your account to get started"}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;