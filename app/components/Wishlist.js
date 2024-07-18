"use client";
import { useState } from "react";
import Image from "next/image";
import { useWishlist } from "@contexts/WishlistContext";

export default function Wishlist() {
  const [isOpen, setIsOpen] = useState(false);
  const { wishlistItems, removeFromWishlist } = useWishlist();

  const toggleWishlist = () => {
    setIsOpen(!isOpen);
  };

  const handleRemoveFromWishlist = (item) => {
    removeFromWishlist(item);
  };

  return (
    <div
      className={`wishlist fixed bottom-0 rounded-t-2xl w-full pt-4 px-4 pb-6 bg-[#C3DDFD] transition-all duration-300 ${
        isOpen ? "h-[300px]" : "h-[80px]"
      }`}
      onClick={toggleWishlist}>
      <div className="wishlist__content flex justify-between items-center">
        <div className="wishlist__logo flex gap-3 items-center">
          <h3 className="wishlist__text font-semibold text-custom-24">Knoll</h3>
          <div className="wishlist__count flex items-center justify-center text-white bg-[#E02424] text-custom-14 rounded-full w-6 h-6">
            <span className="text-center">{wishlistItems.length}</span>
          </div>
        </div>
        <div className="rounded-lg py-2.5 px-5">
          <Image
            src={`/assets/icons/icon-heart.png`}
            alt={"Button Image"}
            width={30}
            height={20}
            className="product__button-image w-5 h-5 cursor-pointer"
          />
        </div>
      </div>
      {isOpen && (
        <div className="wishlist__expanded-content mt-6 max-h-[200px] overflow-y-auto custom-scrollbar">
          {wishlistItems.length === 0 ? (
            <p className="text-center font-medium">Your wishlist is empty</p>
          ) : (
            <ul>
              {wishlistItems.map((item) => (
                <li
                  key={item.label}
                  className="wishlist__item flex justify-between items-center mb-4 gap-2">
                  <div className="wishlist__item-details flex gap-3 items-center">
                    <Image
                      src={`/assets/${item.thumbnail}`}
                      alt={item.label}
                      width={50}
                      height={50}
                      className="aspect-square w-16 h-16 object-cover"
                    />
                    <div>
                      <h4 className="wishlist__item-title font-semibold text-sm text-black">
                        {item.title}
                      </h4>
                      <p className="wishlist__item-label font-normal text-custom-12 text-gray-600">
                        {item.label}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <p className="font-semibold text-sm">€{item.price}</p>
                    <button
                      className="wishlist__remove-button py-1 px-3 rounded-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromWishlist(item);
                      }}>
                      <Image
                        src={`/assets/icons/icon-delete.png`}
                        alt={"Button Image"}
                        width={20}
                        height={20}
                        className="w-4 h-4"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
