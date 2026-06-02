// app/contact/loading.jsx

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-card to-background px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <Skeleton
            height={48}
            width={320}
            className="mx-auto"
          />

          <div className="mt-4 flex flex-col items-center gap-2">
            <Skeleton height={20} width="70%" />
            <Skeleton height={20} width="55%" />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Contact Info Skeleton */}
            <div className="lg:col-span-1">
              <div className="space-y-8">
                {[1, 2, 3].map((item) => (
                  <div key={item}>
                    <Skeleton
                      circle
                      height={48}
                      width={48}
                    />

                    <div className="mt-3">
                      <Skeleton height={20} width={120} />
                    </div>

                    <div className="mt-3 space-y-2">
                      <Skeleton height={16} width="80%" />
                      <Skeleton height={14} width="65%" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form Skeleton */}
            <div className="lg:col-span-2">
              <div className="space-y-6 rounded-xl border border-border bg-card p-8">
                {/* Name + Email */}
                <div className="grid gap-4 sm:grid-cols-2">
                  {[1, 2].map((item) => (
                    <div key={item}>
                      <Skeleton height={16} width={80} />
                      <Skeleton
                        height={44}
                        className="mt-2 rounded-lg"
                      />
                    </div>
                  ))}
                </div>

                {/* Subject */}
                <div>
                  <Skeleton height={16} width={90} />
                  <Skeleton
                    height={44}
                    className="mt-2 rounded-lg"
                  />
                </div>

                {/* Message */}
                <div>
                  <Skeleton height={16} width={100} />

                  <Skeleton
                    height={140}
                    className="mt-2 rounded-lg"
                  />
                </div>

                {/* Button */}
                <Skeleton
                  height={48}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}