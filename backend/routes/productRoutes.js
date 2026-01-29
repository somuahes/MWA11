import express from "express";
import {
  createProduct,
  getProducts,
} from "../controllers/productController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, createProduct)
  .get(protect, getProducts);

export default router;
