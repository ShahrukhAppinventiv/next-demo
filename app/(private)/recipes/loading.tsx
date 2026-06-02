
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function RecipeListingLoading() {
  return (
    <main className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Heading Skeleton */}
        {/* <div className="mb-10 text-center">
          <Skeleton height={40} width={300} className="mx-auto" />
          <div className="mt-3">
            <Skeleton height={20} width={250} className="mx-auto" />
          </div>
        </div> */}

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden  p-4"
            >
              <Skeleton height={220} className="rounded-xl" />

              <div className="mt-4">
                <Skeleton height={24} width="80%" />
              </div>

              <div className="mt-2">
                <Skeleton count={2} />
              </div>

              <div className="mt-4 flex items-center justify-between">
                <Skeleton height={30} width={80} />
                <Skeleton height={36} width={100} borderRadius={999} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}