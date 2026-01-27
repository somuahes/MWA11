import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Please enter username and password.");
      return;
    }

    // Mock login (until backend is ready)
    localStorage.setItem("token", "mock-token");
    navigate("/dashboard");
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
              Login to continue to your dashboard.
            </Typography>
          </Stack>

          <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
              />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
              />

              <Button type="submit" variant="contained" size="large">
                Login
              </Button>
            </Stack>
          </Box>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mt: 3 }}
          >
            *Mock login enabled (backend not connected yet).
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
