"use client";

import { useState } from "react";
import Image from "next/image";
import {  ShoppingCart, Star } from "lucide-react";
import clsx from "clsx";
import Link from "next/link";
import { Product } from "@/app/(private)/products/services/types";
import { useAppDispatch } from "@/app/store/hooks";
import { addItem } from "@/app/store/slices/cart-slice/cartSlice";

export function ProductCard({
  id,
  title,
  thumbnail,
  price,
  discountPercentage,
  rating,
  reviews,
  className,
}: Product) {
  
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useAppDispatch();

  const originalPrice =
    price / (1 - discountPercentage / 100)

  const discount = price
    ? Math.round(((originalPrice - price) / price) * 100)
    : null;
  

  const handleAdd = () => {
    dispatch(
      addItem({ id, name: title, price, image: thumbnail })
    );
  };

  return (
    <div
      className={clsx(
        "group relative flex flex-col overflow-hidden rounded-xl bg-card transition-all duration-300",
        "border border-border/50 hover:border-border",
        "hover:shadow-lg hover:shadow-foreground/5",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-secondary/50">
        <Link href={`/products/${id}`}>
          <Image
            src={thumbnail}
            alt={title}
            fill
            className={clsx(
              " transition-transform duration-500",
              isHovered && "scale-105",
            )}
          />
        </Link>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={clsx(
                  "size-3.5",
                  i < Math.floor(rating)
                    ? "fill-amber-400 text-amber-400"
                    : "fill-muted text-muted",
                )}
              />
            ))}
          </div>

          <span className="text-xs text-muted-foreground">
            {reviews?.length}
          </span>
        </div>

        {/* Name */}
        <h3 className="line-clamp-2 text-sm font-medium text-card-foreground transition-colors group-hover:text-accent">
          {title}
        </h3>

        {/* Price */}
        <div className="mt-auto flex justify-between items-baseline gap-2">
          <div>
            <span className="text-lg font-semibold text-card-foreground">
              ${price.toFixed(2)}
            </span>

            {price && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  ${originalPrice.toFixed(2)}
                </span>

                <span className="text-xs font-medium text-accent">
                  -{discountPercentage}%
                </span>
              </>
            )}
          </div>
          <div>
            <button
              onClick={handleAdd}
              className={clsx(
                "cursor-pointer bg-gradient-to-r from-indigo-500 to-fuchsia-500  text-white   flex size-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-all duration-200",
                "hover:bg-card hover:scale-110",
                
              )}
            >
              <ShoppingCart className={clsx("size-4")} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
