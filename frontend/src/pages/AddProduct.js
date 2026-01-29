import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { addProduct } from "../services/storage"; // Already updated

import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";

function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!formData.name.trim() || formData.quantity === "") {
      setError("Name and quantity are required.");
      setLoading(false);
      return;
    }

    const qty = Number(formData.quantity);
    const pr = formData.price === "" ? 0 : Number(formData.price);

    if (Number.isNaN(qty) || qty < 0) {
      setError("Quantity must be a valid number (0 or more).");
      setLoading(false);
      return;
    }

    if (Number.isNaN(pr) || pr < 0) {
      setError("Price must be a valid number (0 or more).");
      setLoading(false);
      return;
    }

    try {
      await addProduct({
        name: formData.name.trim(),
        quantity: qty,
        price: pr,
        description: formData.description.trim(),
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>
          Add Product
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Enter product details and save.
        </Typography>

        <Card variant="outlined" sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <Stack component="form" onSubmit={handleSubmit} spacing={2}>
              <TextField
                name="name"
                label="Product Name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                required
                disabled={loading}
              />

              <TextField
                name="quantity"
                label="Quantity"
                value={formData.quantity}
                onChange={handleChange}
                fullWidth
                required
                helperText="Enter a number (e.g., 20)"
                disabled={loading}
              />

              <TextField
                name="price"
                label="Price (optional)"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                helperText="Enter a number (e.g., 12.50)"
                disabled={loading}
              />

              <TextField
                name="description"
                label="Description (optional)"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={3}
                disabled={loading}
              />

              <Divider />

              <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                <Button 
                  variant="outlined" 
                  onClick={() => navigate("/dashboard")}
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button 
                  variant="contained" 
                  type="submit"
                  disabled={loading}
                  startIcon={loading && <CircularProgress size={20} />}
                >
                  {loading ? "Saving..." : "Save"}
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default AddProduct;