// lib/fetchProducts.js
export async function fetchProducts() {
  const res = await fetch(process.env.PRODUCT_URI, {
    next: { revalidate: 10 }, // Optional: if you want to revalidate data every 10 seconds
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
