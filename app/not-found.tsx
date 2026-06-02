import Link from "next/link";

export const metadata = {
  title: "Page Not Found — My Shop",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
      <div className="text-center">
        {/* 404 Heading */}
        <div className="mb-6">
          <h1 className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 bg-clip-text text-7xl font-black text-transparent sm:text-8xl">
            404
          </h1>
        </div>

        {/* Message */}
        <h2 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
          Page Not Found
        </h2>

        <p className="mb-8 max-w-md text-muted-foreground text-slate-400">
          The page you're looking for doesn't exist or has been moved. Let's get
          you back on track.
        </p>


        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
     

          <Link
            href="/"
            className="rounded-xl border border-slate-600 px-6 py-3 font-semibold text-white transition duration-200 hover:bg-slate-700/50"
          >
            Go Home
          </Link>
        </div>

 
      </div>
    </div>
  );
}
