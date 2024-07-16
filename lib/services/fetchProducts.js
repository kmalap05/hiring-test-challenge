// lib/fetchProducts.js
export async function fetchProducts() {
  const res = await fetch(
    "https://hiring-workspace.vercel.app/api/v1/furniture",
    {
      next: { revalidate: 10 }, // Optional: if you want to revalidate data every 10 seconds
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
