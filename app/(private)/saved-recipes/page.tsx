"use client";

import Link from "next/link";
import { Bookmark } from "lucide-react";
import { useAppSelector } from "@/app/store/hooks";
import { RecipeCard } from "../recipes/components/recipe-card";

export default function SavedRecipesPage() {
  const savedRecipes = useAppSelector((state) => state.recipeSlice.savedRecipes);

  return (
    <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <div className="inline-flex size-12 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-md">
            <Bookmark className="size-6 fill-current" />
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Saved Recipes
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Keep your favorite recipes close for your next cooking session.
          </p>
        </div>

        {savedRecipes.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <h2 className="text-xl font-semibold text-foreground">
              No saved recipes yet
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Bookmark recipes from the list or detail page and they will appear here.
            </p>
            <Link
              href="/recipes"
              className="mt-6 inline-flex rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-md"
            >
              Browse recipes
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
