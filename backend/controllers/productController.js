import Product from "../models/Product.js";

// CREATE
export const createProduct = async (req, res) => {
  const { name, price, quantity } = req.body;

  const product = await Product.create({
    name,
    price,
    quantity,
    user: req.user._id,
  });

  res.status(201).json(product);
};

// GET ALL
export const getProducts = async (req, res) => {
  const products = await Product.find({ user: req.user._id });
  res.json(products);
};
