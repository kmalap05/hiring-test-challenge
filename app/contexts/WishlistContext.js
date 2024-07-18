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
    // Initialize from local storage
    if (typeof window !== "undefined") {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist"));
      if (storedWishlist) {
        setWishlistItems(storedWishlist);
      }
    }
  }, []);

  useEffect(() => {
    // Sync with local storage
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
    }
  }, [wishlistItems]);

  const addToWishlist = useCallback((item) => {
    setWishlistItems((prevItems) => [...prevItems, item]);
  }, []);

  const removeFromWishlist = useCallback((itemToRemove) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.label !== itemToRemove.label)
    );
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
