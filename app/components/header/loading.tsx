import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="mx-auto min-h-[620px] max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Skeleton width={160} height={40} borderRadius={999} />

            <div className="mt-6">
              <Skeleton height={64} width="80%" />
              <Skeleton height={64} width="60%" className="mt-2" />
            </div>

            <div className="mt-5">
              <Skeleton count={2} height={20} />
            </div>

            <div className="mt-6 flex gap-3">
              <Skeleton width={100} height={40} borderRadius={999} />
              <Skeleton width={120} height={40} borderRadius={999} />
              <Skeleton width={90} height={40} borderRadius={999} />
            </div>
          </div>

          <div className="mt-12 grid max-w-xl grid-cols-3 gap-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-white/15 p-4"
              >
                <Skeleton height={28} />
                <Skeleton height={12} className="mt-2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Picks */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Skeleton width={120} height={16} />
          <Skeleton width={320} height={40} className="mt-3" />
          <Skeleton width={500} height={18} className="mt-3" />

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-lg border border-border"
              >
                <Skeleton height={250} />

                <div className="p-5">
                  <div className="flex justify-between">
                    <Skeleton width={100} height={16} />
                    <Skeleton width={60} height={28} borderRadius={999} />
                  </div>

                  <Skeleton height={28} className="mt-4" />

                  <Skeleton
                    width={100}
                    height={18}
                    className="mt-4"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular This Week */}
      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Skeleton width={120} height={16} />
          <Skeleton width={320} height={40} className="mt-3" />
          <Skeleton width={500} height={18} className="mt-3" />

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-slate-200 p-3"
              >
                <Skeleton height={240} />

                <div className="pt-4">
                  <Skeleton height={24} />

                  <Skeleton
                    width={120}
                    height={16}
                    className="mt-3"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Skeleton width={120} height={16} />
          <Skeleton width={300} height={40} className="mt-3" />
          <Skeleton width={450} height={18} className="mt-3" />

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-border p-6"
              >
                <Skeleton circle width={32} height={32} />

                <div className="mt-5">
                  <Skeleton count={4} height={18} />
                </div>

                <div className="mt-6 border-t pt-5">
                  <Skeleton width={120} height={20} />
                  <Skeleton width={180} height={16} className="mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}