import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AppBar position="sticky" elevation={0} sx={{ borderBottom: "1px solid", borderColor: "divider" }}>
      <Toolbar sx={{ maxWidth: 1100, width: "100%", mx: "auto" }}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 800, cursor: "pointer" }}
          onClick={() => navigate("/dashboard")}
        >
          IMS
        </Typography>

        <Box sx={{ flex: 1 }} />

        <Button color="inherit" onClick={() => navigate("/dashboard")}>Dashboard</Button>
        <Button color="inherit" onClick={() => navigate("/add")}>Add Product</Button>
        <Button variant="outlined" color="inherit" onClick={logout} sx={{ ml: 1 }}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
