import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { addProduct } from "../services/storage";

import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Divider,
} from "@mui/material";

function AddProduct() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || quantity === "") {
      alert("Name and quantity are required.");
      return;
    }

    const qty = Number(quantity);
    const pr = price === "" ? 0 : Number(price);

    if (Number.isNaN(qty) || qty < 0) {
      alert("Quantity must be a valid number (0 or more).");
      return;
    }

    if (Number.isNaN(pr) || pr < 0) {
      alert("Price must be a valid number (0 or more).");
      return;
    }

    addProduct({
      id: Date.now().toString(),
      name: name.trim(),
      quantity: qty,
      price: pr,
      description: description.trim(),
      createdAt: new Date().toISOString(),
    });

    navigate("/dashboard");
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
            <Stack component="form" onSubmit={handleSubmit} spacing={2}>
              <TextField
                label="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
              />

              <TextField
                label="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                fullWidth
                required
                helperText="Enter a number (e.g., 20)"
              />

              <TextField
                label="Price (optional)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                helperText="Enter a number (e.g., 12.50)"
              />

              <TextField
                label="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={3}
              />

              <Divider />

              <Stack direction="row" spacing={1.5} justifyContent="flex-end">
                <Button variant="outlined" onClick={() => navigate("/dashboard")}>
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Save
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
