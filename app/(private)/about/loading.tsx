
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8">
      <section className="mx-auto mt-12 max-w-6xl rounded-3xl border border-border bg-card p-8 shadow-lg">
        <div className="space-y-8">
          <div>
            <Skeleton
              width={120}
              height={18}
              baseColor="#e5e7eb"
              highlightColor="#f3f4f6"
            />

            <div className="mt-4 space-y-3">
              <Skeleton height={14} />
              <Skeleton height={14} />
              <Skeleton height={14} />
              <Skeleton height={14} width="90%" />
              <Skeleton height={14} width="80%" />
            </div>
          </div>

          <div className="space-y-3">
            <Skeleton height={14} />
            <Skeleton height={14} />
            <Skeleton height={14} width="95%" />
            <Skeleton height={14} width="85%" />
          </div>
        </div>
      </section>
    </main>
  );
}