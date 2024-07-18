// app/page.js
import { fetchProducts } from "@lib/services/fetchProducts";
import ProductCard from "./components/ProductCard";
import Wishlist from "./components/Wishlist";
import { WishlistProvider } from "@contexts/WishlistContext";

export default async function Home() {
  const products = await fetchProducts();

  return (
    <WishlistProvider>
      <main className="mt-6 mx-4 mb-24 font-semibold text-custom-18 flex flex-col gap-6">
        <h3>Our products</h3>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </main>
      <Wishlist />
    </WishlistProvider>
  );
}
