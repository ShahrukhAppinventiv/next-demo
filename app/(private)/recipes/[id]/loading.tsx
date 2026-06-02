import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
    return (
        <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">

                {/* Back button */}
                <Skeleton width={120} height={20} className="mb-8" />

                {/* Hero Image */}
                <div className="mb-8 overflow-hidden rounded-xl">
                    <Skeleton height={384} />
                </div>

                {/* Title */}
                <Skeleton height={40} width="70%" className="mb-4" />

                {/* Tags */}
                <div className="mb-8 flex gap-2">
                    <Skeleton width={80} height={32} borderRadius={20} />
                    <Skeleton width={100} height={32} borderRadius={20} />
                    <Skeleton width={70} height={32} borderRadius={20} />
                </div>

                {/* Quick Info */}
                <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="rounded-lg bg-card p-4 text-center"
                        >
                            <Skeleton circle width={24} height={24} className="mx-auto mb-2" />
                            <Skeleton height={20} width={50} className="mx-auto mb-2" />
                            <Skeleton height={12} width={80} className="mx-auto" />
                        </div>
                    ))}
                </div>

                {/* Details Grid */}
                <div className="mb-8 grid gap-8 sm:grid-cols-2">
                    {/* Ingredients */}
                    <div>
                        <Skeleton height={32} width={180} className="mb-4" />

                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="mb-3">
                                <Skeleton height={18} />
                            </div>
                        ))}
                    </div>

                    {/* Recipe Info */}
                    <div>
                        <Skeleton height={32} width={180} className="mb-4" />

                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="mb-4">
                                <Skeleton height={12} width={100} className="mb-2" />
                                <Skeleton height={18} width={150} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Instructions */}
                <div>
                    <Skeleton height={32} width={180} className="mb-4" />

                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="mb-4 flex gap-4">
                            <Skeleton circle width={32} height={32} />
                            <Skeleton height={20} width="90%" />
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}