"use client";

import { useState } from "react";
import { ShoppingCart, Menu, X, LogOut, ChefHat, Bookmark } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/app/store/hooks";
import { signOut } from "next-auth/react";
import ConfirmationDialog from "@/app/components/confirmation-dialog/ConfirmationDialog";
import { toast } from "react-toastify";

const navLinks = [
  { to: "/home", label: "Home" },
  // { to: "/products", label: "Products" },
  { to:"/recipes", label: "Recipes" },
  { to: "/about", label: "About" },
  { to: "/contact-us", label: "Contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [isSignOutDialogOpen, setIsSignOutDialogOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const cartCount = useAppSelector((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );
  const savedRecipeCount = useAppSelector(
    (state) => state.recipeSlice.savedRecipes.length,
  );

  const handleSignOut = async () => {
    if (isSigningOut) return;

    setIsSigningOut(true);
    try {
      await signOut({ redirect: false });
      toast.success("Signout successfully");
      router.push("/login");
    } finally {
      setIsSigningOut(false);
      setIsSignOutDialogOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 shadow-lg">
      {/* Header Background */}

      <div className=" flex h-16 w-full  items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/home" className="flex items-center gap-2 group">
          <span className="flex size-10 items-center justify-center rounded-full bg-white text-indigo-600 shadow-md transition group-hover:scale-105">
            <ChefHat className="size-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight text-white">
            RecipeNest
            <span className="text-white/70">.</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 shadow-md">
          {navLinks.map((l) => {
            const isActive =
              pathname === l.to || pathname.startsWith(`${l.to}/`);

            return (
              <Link
                key={l.to}
                href={l.to}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition
          ${
            isActive
              ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-lg"
              : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Link
            href="/saved-recipes"
            aria-label="Saved recipes"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-slate-100 hover:text-slate-900"
          >
            <Bookmark className="h-5 w-5" />

            {savedRecipeCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[1.1rem] min-w-[1.1rem] items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold text-indigo-600 border-2 border-indigo-500 shadow-md">
                {savedRecipeCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          {/* <Link
            href="/cart"
            aria-label="Cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-slate-100 hover:text-slate-900"
          >
            <ShoppingCart className="h-5 w-5" />

            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-[1.1rem] min-w-[1.1rem] items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-1 text-[10px] font-semibold text-white border-2 shadow-md">
                {cartCount}
              </span>
            )}
          </Link> */}

          {/* Profile */}
          {/* <button
            type="button"
            aria-label="Profile"
            className="relative ml-1 h-10 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 p-[2px] transition hover:scale-105"
          >
            <img
              src="https://i.pravatar.cc/80?img=47"
              alt="Profile"
              className="h-full w-full rounded-full border-2 border-white object-cover"
            />

            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
          </button> */}

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-900 transition hover:bg-slate-100 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <button
            type="button"
            aria-label="Sign out"
            className="cursor-pointer inline-flex h-10 w-10 items-center justify-center rounded-full text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-70"
            disabled={isSigningOut}
            onClick={() => setIsSignOutDialogOpen(true)}
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>

      <ConfirmationDialog
        open={isSignOutDialogOpen}
        title="Sign out?"
        description="You will need to sign in again to access your account and cart."
        confirmLabel="Sign out"
        loadingLabel="Signing out"
        loading={isSigningOut}
        onCancel={() => setIsSignOutDialogOpen(false)}
        onConfirm={handleSignOut}
      />
    </header>
  );
}
