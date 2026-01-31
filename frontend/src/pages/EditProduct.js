import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProductById, updateProduct } from "../services/storage";

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

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    description: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    // Moved fetchProduct INSIDE useEffect
    const fetchProduct = async () => {
      try {
        const product = await getProductById(id);

        if (!product) {
          alert("Product not found.");
          navigate("/dashboard");
          return;
        }

        setFormData({
          name: product.name ?? "",
          quantity: String(product.quantity ?? ""),
          price: String(product.price ?? ""),
          description: product.description ?? "",
        });
      } catch (err) {
        setError("Failed to load product. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]); // No more missing dependency warning!

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    if (!formData.name.trim() || formData.quantity === "") {
      setError("Name and quantity are required.");
      setSaving(false);
      return;
    }

    const qty = Number(formData.quantity);
    const pr = formData.price === "" ? 0 : Number(formData.price);

    if (Number.isNaN(qty) || qty < 0) {
      setError("Quantity must be a valid number (0 or more).");
      setSaving(false);
      return;
    }

    if (Number.isNaN(pr) || pr < 0) {
      setError("Price must be a valid number (0 or more).");
      setSaving(false);
      return;
    }

    try {
      await updateProduct(id, {
        name: formData.name.trim(),
        quantity: qty,
        price: pr,
        description: formData.description.trim(),
      });

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update product. Please try again.");
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>
          Edit Product
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Update product details and save.
        </Typography>

        <Card variant="outlined" sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 3 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {loading ? (
              <Stack alignItems="center" justifyContent="center" sx={{ py: 4 }}>
                <CircularProgress />
                <Typography sx={{ mt: 2 }}>Loading product...</Typography>
              </Stack>
            ) : (
              <Stack component="form" onSubmit={handleSubmit} spacing={2}>
                <TextField
                  name="name"
                  label="Product Name"
                  value={formData.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  disabled={saving}
                />

                <TextField
                  name="quantity"
                  label="Quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  fullWidth
                  required
                  helperText="Enter a number (e.g., 20)"
                  disabled={saving}
                />

                <TextField
                  name="price"
                  label="Price (optional)"
                  value={formData.price}
                  onChange={handleChange}
                  fullWidth
                  helperText="Enter a number (e.g., 12.50)"
                  disabled={saving}
                />

                <TextField
                  name="description"
                  label="Description (optional)"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={3}
                  disabled={saving}
                />

                <Divider />

                <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                  <Button 
                    variant="outlined" 
                    onClick={() => navigate("/dashboard")}
                    disabled={saving}
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="contained" 
                    type="submit"
                    disabled={saving}
                    startIcon={saving && <CircularProgress size={20} />}
                  >
                    {saving ? "Updating..." : "Update"}
                  </Button>
                </Stack>
              </Stack>
            )}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default EditProduct;