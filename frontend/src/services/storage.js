const KEY = "ims_products";

export function getProducts() {
  const raw = localStorage.getItem(KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveProducts(products) {
  localStorage.setItem(KEY, JSON.stringify(products));
}

export function addProduct(product) {
  const products = getProducts();
  products.unshift(product);
  saveProducts(products);
}
export function getProductById(id) {
  const products = getProducts();
  return products.find((p) => p.id === id);
}

export function updateProduct(id, updates) {
  const products = getProducts();
  const updatedProducts = products.map((p) =>
    p.id === id ? { ...p, ...updates } : p
  );
  saveProducts(updatedProducts);
  return updatedProducts;
}
