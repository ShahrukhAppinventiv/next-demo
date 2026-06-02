
"use client"
import Image from "next/image"
import Link from "next/link"
import {
    Heart,
    ShoppingCart,
    Star,
    Truck,
    RotateCcw,
    Shield,
    ArrowLeft,
} from "lucide-react"
import clsx from "clsx"
import { useProductDetailsHelper } from "./helper"
import ProductDetailsSkeleton from "../../[id]/loading"
const ProductDetails = () => {
    const { product, loading, originalPrice, ratingStars, isWishlisted, handleAddToCart } = useProductDetailsHelper()
    if (loading || !product) {
        return (
            <ProductDetailsSkeleton />

        )
    }


    return (
        <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">

                {/* Back Button */}
                <Link
                    href="/"
                    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                >
                    <ArrowLeft className="size-4" />
                    Back to Products
                </Link>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

                    {/* Product Image */}
                    <div className="flex items-center justify-center">
                        <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-xl bg-secondary/50">
                            <Image
                                src={product?.thumbnail || ''}
                                alt={product?.title || ''}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col gap-6">

                        {/* Category & Brand */}
                        <div className="flex items-center gap-3">
                            <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent uppercase">
                                {product?.category}
                            </span>

                            <span className="text-sm font-medium text-muted-foreground">
                                By {product.brand}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className="text-balance text-2xl font-bold text-foreground sm:text-3xl">
                            {product.title}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`size-4 ${i < ratingStars
                                            ? "fill-amber-400 text-amber-400"
                                            : "fill-muted text-muted"
                                            }`}
                                    />
                                ))}
                            </div>

                            <span className="text-sm font-medium text-foreground">
                                {product.rating} ({product.reviews?.length} reviews)
                            </span>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground leading-relaxed">
                            {product.description}
                        </p>

                        {/* Price */}
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-foreground">
                                ${product.price.toFixed(2)}
                            </span>

                            <span className="text-lg text-muted-foreground line-through">
                                ${originalPrice.toFixed(2)}
                            </span>

                            <span className="text-sm font-semibold text-accent">
                                -{product.discountPercentage.toFixed(1)}%
                            </span>
                        </div>

                        {/* Stock */}
                        <div className="flex items-center gap-2">
                            <span
                                className={`inline-block size-2 rounded-full ${product.stock > 0
                                    ? "bg-green-500"
                                    : "bg-red-500"
                                    }`}
                            />

                            <span
                                className={`text-sm font-medium ${product.stock > 0
                                    ? "text-green-600"
                                    : "text-red-600"
                                    }`}
                            >
                                {product.availabilityStatus} ({product.stock} units)
                            </span>
                            <button onClick={handleAddToCart}
                                className={clsx(
                                    "cursor-pointer bg-gradient-to-r from-indigo-500 to-fuchsia-500  text-white   flex size-9 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm transition-all duration-200",
                                    "hover:bg-card hover:scale-110",
                                    isWishlisted && "text-red-500",
                                )}
                            >
                                <ShoppingCart className={clsx("size-4")} />
                            </button>
                        </div>

                        {/* Quantity */}
                        <div className="flex gap-3">
                            {/* <div className="flex items-center rounded-lg border border-border bg-card">
                <button
                  onClick={() =>
                    setQuantity(Math.max(1, quantity - 1))
                  }
                  className="px-3 py-2"
                >
                  −
                </button>

                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.max(
                        1,
                        parseInt(e.target.value) || 1
                      )
                    )
                  }
                  className="w-12 border-x border-border bg-transparent text-center outline-none"
                />

                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2"
                >
                  +
                </button>
              </div> */}
                            {/* 
              <Button onClick={handleAddToCart} className="flex-1 gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <ShoppingCart className="size-4" />
                Add to Cart
              </Button> */}

                            {/* <button
                onClick={() =>
                  setIsWishlisted(!isWishlisted)
                }
                className="flex items-center justify-center rounded-lg border border-border bg-card px-4 py-2"
              >
                <Heart
                  className={`size-5 ${isWishlisted
                      ? "fill-red-500 text-red-500"
                      : "text-muted-foreground"
                    }`}
                />
              </button> */}
                        </div>

                        {/* Product Info */}
                        <div className="space-y-2 border-t border-border pt-6">

                            <div className="flex items-start gap-3">
                                <Truck className="size-5 text-accent flex-shrink-0 mt-0.5" />

                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        Shipping
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        {product.shippingInformation}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <RotateCcw className="size-5 text-accent flex-shrink-0 mt-0.5" />

                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        Returns
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        {product.returnPolicy}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <Shield className="size-5 text-accent flex-shrink-0 mt-0.5" />

                                <div>
                                    <p className="text-sm font-medium text-foreground">
                                        Warranty
                                    </p>

                                    <p className="text-sm text-muted-foreground">
                                        {product.warrantyInformation}
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* Specifications */}
                <div className="mt-12 border-t border-border pt-8">
                    <h2 className="mb-6 text-2xl font-bold text-foreground">
                        Specifications
                    </h2>

                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">

                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                SKU
                            </p>

                            <p className="text-foreground font-medium">
                                {product.sku}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Weight
                            </p>

                            <p className="text-foreground font-medium">
                                {product.weight}g
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Width
                            </p>

                            <p className="text-foreground font-medium">
                                {product.dimensions?.width}cm
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Height
                            </p>

                            <p className="text-foreground font-medium">
                                {product.dimensions?.height}cm
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-medium text-muted-foreground">
                                Depth
                            </p>

                            <p className="text-foreground font-medium">
                                {product.dimensions?.depth}cm
                            </p>
                        </div>

                    </div>
                </div>

                {/* Reviews */}
                <div className="mt-12 border-t border-border pt-8">
                    <h2 className="mb-6 text-2xl font-bold text-foreground">
                        Customer Reviews
                    </h2>

                    <div className="space-y-4">
                        {product.reviews?.map((review, idx) => (
                            <div
                                key={idx}
                                className="rounded-lg border border-border bg-card p-4"
                            >
                                <div className="flex items-start justify-between">

                                    <div>
                                        <div className="mb-2 flex items-center gap-2">

                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`size-3.5 ${i < review.rating
                                                            ? "fill-amber-400 text-amber-400"
                                                            : "fill-muted text-muted"
                                                            }`}
                                                    />
                                                ))}
                                            </div>

                                            <span className="text-sm font-medium text-foreground">
                                                {review.rating}/5
                                            </span>
                                        </div>

                                        <h3 className="font-medium text-foreground">
                                            {review.reviewerName}
                                        </h3>

                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {review.comment}
                                        </p>
                                    </div>

                                    <span className="ml-4 whitespace-nowrap text-xs text-muted-foreground">
                                        {new Date(review.date).toLocaleDateString()}
                                    </span>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </main>
    )
}

export default ProductDetails