"use client";

import { Bookmark } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { cn } from "@/app/lib/utils";
import { toggleSavedRecipe } from "../../services/slice";

type SaveRecipeButtonProps = {
  recipe: Recipe;
  className?: string;
  label?: boolean;
};

export function SaveRecipeButton({
  recipe,
  className,
  label = false,
}: SaveRecipeButtonProps) {
  const dispatch = useAppDispatch();
  const isSaved = useAppSelector((state) =>
    state.recipeSlice.savedRecipes.some((item) => item.id === recipe.id)
  );

  return (
    <button
      type="button"
      aria-label={isSaved ? "Remove saved recipe" : "Save recipe"}
      aria-pressed={isSaved}
      onClick={() => dispatch(toggleSavedRecipe(recipe))}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border transition",
        isSaved
          ? "border-transparent bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-md"
          : "border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:text-slate-950",
        label ? "px-4 py-2 text-sm font-semibold" : "size-10",
        className
      )}
    >
      <Bookmark className={cn("size-5", isSaved && "fill-current")} />
      {label && <span>{isSaved ? "Saved" : "Save recipe"}</span>}
    </button>
  );
}
