"use client"

import Skeleton from "react-loading-skeleton"
import "react-loading-skeleton/dist/skeleton.css"

export default function ProductDetailsSkeleton() {
  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Back Button */}
        <div className="mb-8 w-40">
          <Skeleton height={20} />
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <Skeleton
              height={500}
              className="rounded-xl"
              containerClassName="w-full max-w-md"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6">
            {/* Category & Brand */}
            <div className="flex items-center gap-3">
              <Skeleton width={90} height={28} borderRadius={9999} />
              <Skeleton width={120} height={20} />
            </div>

            {/* Title */}
            <div>
              <Skeleton height={40} width="80%" />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3">
              <Skeleton width={120} height={20} />
              <Skeleton width={80} height={20} />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Skeleton count={3} height={18} />
            </div>

            {/* Price */}
            <div className="flex items-center gap-3">
              <Skeleton width={100} height={35} />
              <Skeleton width={80} height={28} />
              <Skeleton width={60} height={24} />
            </div>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <Skeleton circle width={10} height={10} />
              <Skeleton width={180} height={20} />
            </div>

            {/* Quantity & Buttons */}
            <div className="flex gap-3">
              <Skeleton width={130} height={44} borderRadius={8} />
              <Skeleton height={44} borderRadius={8} className="flex-1" />
              <Skeleton width={50} height={44} borderRadius={8} />
            </div>

            {/* Product Info */}
            <div className="space-y-4 border-t border-border pt-6">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="flex gap-3">
                  <Skeleton circle width={20} height={20} />
                  <div className="flex-1">
                    <Skeleton width={100} height={18} />
                    <Skeleton width="70%" height={16} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-12 border-t border-border pt-8">
          <Skeleton width={220} height={35} className="mb-6" />

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[...Array(5)].map((_, idx) => (
              <div key={idx}>
                <Skeleton width={80} height={16} />
                <Skeleton width={100} height={20} />
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-12 border-t border-border pt-8">
          <Skeleton width={260} height={35} className="mb-6" />

          <div className="space-y-4">
            {[...Array(3)].map((_, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-border bg-card p-4"
              >
                <div className="flex justify-between gap-4">
                  <div className="flex-1">
                    <Skeleton width={120} height={18} className="mb-2" />
                    <Skeleton width={150} height={20} className="mb-2" />
                    <Skeleton count={2} height={16} />
                  </div>

                  <Skeleton width={80} height={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}