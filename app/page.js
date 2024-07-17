// app/page.js
import { fetchProducts } from "../lib/services/fetchProducts";
import ProductCard from "./components/ProductCard";

export default async function Home() {
  const products = await fetchProducts();

  return (
    <>
      <main className="mt-6 mx-4 font-semibold text-custom-18 flex flex-col gap-6 relative">
        <h3>Our products</h3>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
    </>
  );
}
