"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useWishlist } from "@contexts/WishlistContext";

export default function Product({ product }) {
  const { title, description, variants, tags } = product;
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  const [selectedVariant, setSelectedVariant] = useState(variants[0]);

  const handleWishlistToggle = () => {
    if (isInWishlist(selectedVariant)) {
      removeFromWishlist(selectedVariant);
    } else {
      addToWishlist({
        ...selectedVariant,
        title,
        description,
      });
    }
  };

  const isInWishlist = (variant) => {
    return wishlistItems.some((item) => item.label === variant.label);
  };

  const handleVariantClick = (variant) => {
    setSelectedVariant(variant);
  };

  return (
    <div className="product border-[1px] border-[#374151] rounded-lg bg-gray-800">
      <div className="product__header relative">
        <div className="product__image">
          {variants.length > 0 && (
            <Image
              src={`/assets/${selectedVariant.thumbnail}`}
              alt={selectedVariant.label}
              width={300}
              height={200}
              className="aspect-square w-full rounded-t-lg"
            />
          )}
        </div>
        <div className="product__indicator absolute top-0 mt-3.5 ml-3.5 text-center flex gap-2">
          {tags && tags.length > 0 && (
            <>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="py-0.5 px-2.5 bg-[#84E1BC] text-[#014737] font-medium text-custom-12 rounded-full">
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </span>
              ))}
            </>
          )}
          {selectedVariant.reducedPrice && (
            <span className="py-0.5 px-2.5 bg-[#FEECDC] text-[#8A2C0D] font-medium text-custom-12 rounded-full">
              -
              {(
                ((selectedVariant.price - selectedVariant.reducedPrice) /
                  selectedVariant.price) *
                100
              ).toFixed(1)}
              %
            </span>
          )}
        </div>
      </div>
      <div className="product__content pt-6 px-4 pb-4 flex flex-col gap-5">
        <div className="product__heading flex flex-col gap-2">
          <h2 className="product__title font-bold text-custom-16 text-white uppercase">
            {title}
          </h2>
          <p className="product__description font-normal text-base text-gray-400">
            {description}
          </p>
        </div>
        <div className="product__variants">
          <ul className="flex flex-wrap gap-3">
            {variants.map((variant) => (
              <li
                key={variant.label}
                className={`w-6 h-6 rounded-full ${
                  selectedVariant === variant
                    ? "border-2 border-white"
                    : "border-[0.5px] border-gray-300"
                }`}
                style={{ backgroundColor: variant.color }}
                onClick={() => handleVariantClick(variant)}></li>
            ))}
          </ul>
        </div>
        <div className="product__purchase flex justify-between items-center">
          {selectedVariant.reducedPrice ? (
            <div className="flex gap-2">
              <p className="product__price font-bold text-custom-16 text-white line-through">
                €{selectedVariant.price}
              </p>
              <p className="product__reduced-price font-bold text-custom-16 text-white">
                €{selectedVariant.reducedPrice}
              </p>
            </div>
          ) : (
            <p className="product__price font-bold text-custom-16 text-white">
              €{selectedVariant.price}
            </p>
          )}
          <button
            className={`product__button border-[1px] py-2.5 px-5 rounded-lg ${
              isInWishlist(selectedVariant) ? "bg-[#E02424]" : ""
            }`}
            onClick={handleWishlistToggle}>
            <Image
              src={`/assets/icons/icon-heart.png`}
              alt={"Button Image"}
              width={300}
              height={200}
              className="product__button-image w-5 h-5"></Image>
          </button>
        </div>
      </div>
    </div>
  );
}
