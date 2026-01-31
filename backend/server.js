import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
connectDB();

const app = express();

// CORS Configuration for Production
const allowedOrigins = [
  'http://localhost:3000',                      // Local development
  'https://inventory-app.vercel.app',           // Your Vercel frontend (update after deployment)
  'https://*.vercel.app'                        // All Vercel preview deployments
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman)
    if (!origin) return callback(null, true);
    
    // Check if the origin is allowed
    if (allowedOrigins.includes(origin) || 
        allowedOrigins.some(pattern => pattern.includes('*') && origin.endsWith(pattern.split('*')[1]))) {
      return callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      return callback(new Error('CORS policy: Origin not allowed'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// Health check route
app.get("/", (req, res) => {
  res.json({ 
    message: "Inventory API running 🚀",
    status: "healthy",
    timestamp: new Date(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Test route for CORS
app.get("/test-cors", (req, res) => {
  res.json({ 
    message: "CORS test successful",
    origin: req.headers.origin,
    allowed: true
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`)
);