// src/services/storage.js
import * as api from './api';

// Note: We're keeping the same function names but now they call the real API

export async function getProducts() {
  try {
    const products = await api.getProducts();
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return []; // Return empty array on error
  }
}

export async function addProduct(product) {
  try {
    // Remove id and createdAt from product if they exist
    const { id, createdAt, ...productData } = product;
    const newProduct = await api.createProduct(productData);
    return newProduct;
  } catch (error) {
    console.error('Failed to add product:', error);
    throw error;
  }
}

export async function getProductById(id) {
  try {
    const product = await api.getProductById(id);
    return product;
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return null;
  }
}

export async function updateProduct(id, updates) {
  try {
    const updatedProduct = await api.updateProduct(id, updates);
    return updatedProduct;
  } catch (error) {
    console.error('Failed to update product:', error);
    throw error;
  }
}

export async function deleteProduct(id) {
  try {
    await api.deleteProduct(id);
    return true;
  } catch (error) {
    console.error('Failed to delete product:', error);
    throw error;
  }
}

// For backward compatibility (if any component calls saveProducts directly)
export function saveProducts(products) {
  console.warn('saveProducts is deprecated. Products are now saved via API.');
}