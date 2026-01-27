import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getProducts, saveProducts } from "../services/storage";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Stack,
  Chip,
} from "@mui/material";

function Dashboard() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }

    setProducts(getProducts());
  }, [navigate]);

  const handleDelete = (id) => {
    const ok = window.confirm("Are you sure you want to delete this product?");
    if (!ok) return;

    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveProducts(updated);
  };

  return (
    <>
      <Navbar />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 0.5 }}>
          Inventory
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          View and manage available products.
        </Typography>

        {products.length === 0 ? (
          <Card variant="outlined" sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography sx={{ fontWeight: 600 }}>
                No products available.
              </Typography>
              <Typography color="text.secondary">
                Use “Add Product” from the top menu to add items.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          <Grid container spacing={2}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <Card
                  variant="outlined"
                  sx={{
                    borderRadius: 3,
                    height: "100%",
                  }}
                >
                  <CardContent>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{ mb: 1 }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {product.name}
                      </Typography>

                      <Chip
                        label={`Qty: ${product.quantity}`}
                        size="small"
                      />
                    </Stack>

                    <Typography color="text.secondary">
                      Price: {product.price}
                    </Typography>

                    {product.description && (
                      <Typography sx={{ mt: 1 }}>
                        {product.description}
                      </Typography>
                    )}
                  </CardContent>

                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => navigate(`/edit/${product.id}`)}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}

export default Dashboard;
