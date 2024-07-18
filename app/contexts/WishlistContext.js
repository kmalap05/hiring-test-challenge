"use client";
import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useMemo,
  useEffect,
} from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    // Fetch wishlist items from the database
    const fetchWishlistItems = async () => {
      const response = await fetch("/api/wishlist");
      const data = await response.json();
      setWishlistItems(data);
    };
    fetchWishlistItems();
  }, []);

  const addToWishlist = useCallback(async (item) => {
    const response = await fetch("/api/wishlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (response.ok) {
      setWishlistItems((prevItems) => [...prevItems, item]);
    }
  }, []);

  const removeFromWishlist = useCallback(async (itemToRemove) => {
    const response = await fetch("/api/wishlist", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ label: itemToRemove.label }),
    });
    if (response.ok) {
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.label !== itemToRemove.label)
      );
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
    }),
    [wishlistItems, addToWishlist, removeFromWishlist]
  );

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistContext;
