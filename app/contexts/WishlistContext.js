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

  const fetchWishlistItems = useCallback(async () => {
    try {
      const response = await fetch("/api/wishlist");
      if (!response.ok) throw new Error("Failed to fetch wishlist items");
      const data = await response.json();
      setWishlistItems(data);
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
    }
  }, []);

  useEffect(() => {
    fetchWishlistItems();
  }, [fetchWishlistItems]);

  const updateWishlist = useCallback(async (method, item) => {
    try {
      const response = await fetch("/api/wishlist", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          method === "DELETE" ? { label: item.label } : item
        ),
      });
      if (!response.ok)
        throw new Error(
          `Failed to ${method === "POST" ? "add to" : "remove from"} wishlist`
        );

      setWishlistItems((prevItems) =>
        method === "POST"
          ? [...prevItems, item]
          : prevItems.filter((prevItem) => prevItem.label !== item.label)
      );
    } catch (error) {
      console.error(
        `Error ${method === "POST" ? "adding to" : "removing from"} wishlist:`,
        error
      );
    }
  }, []);

  const addToWishlist = useCallback(
    (item) => updateWishlist("POST", item),
    [updateWishlist]
  );
  const removeFromWishlist = useCallback(
    (item) => updateWishlist("DELETE", item),
    [updateWishlist]
  );

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
