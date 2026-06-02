"use client"

import Image from "next/image"
import Link from "next/link"
import { Clock, Users, Flame, ChefHat, Star } from "lucide-react"
import { cn } from "@/app/lib/utils"
import { SaveRecipeButton } from "../save-recipe-button"

interface RecipeCardProps extends Recipe {
  className?: string
}

export function RecipeCard({
  id,
  name,
  image,
  rating,
  cookTimeMinutes,
  difficulty,
  cuisine,
  servings,
  caloriesPerServing,
  mealType,
  className,
  ...recipe
}: RecipeCardProps) {
  const currentRecipe = {
    id,
    name,
    image,
    rating,
    cookTimeMinutes,
    difficulty,
    cuisine,
    servings,
    caloriesPerServing,
    mealType,
    ...recipe,
  };

  const difficultyColors = {
    Easy: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Medium: "bg-amber-100 text-amber-700 border-amber-200",
    Hard: "bg-rose-100 text-rose-700 border-rose-200",
  }

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-500",
        "bg-card shadow-md hover:shadow-2xl",
        "border border-border/40 hover:border-primary/40",
        className
      )}
    >
      <Link href={`/recipes/${id}`} className="block">
        {/* Image Container */}
        <div className="relative h-56 w-full overflow-hidden bg-muted">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

          {/* Top Badges Container */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
            {/* Difficulty Badge */}
            <span
              className={cn(
                "inline-block rounded-full px-3 py-1.5 text-xs font-bold border backdrop-blur-sm",
                difficultyColors[difficulty as keyof typeof difficultyColors]
              )}
            >
              {difficulty}
            </span>

            {/* Rating Badge */}
            <div className="flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-sm transition-all group-hover:bg-black/70">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-white">{rating}</span>
            </div>
          </div>

          {/* Quick Access Arrow - appears on hover */}
          {/* <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 translate-y-2 opacity-0">
            <ArrowRight className="h-5 w-5" />
          </div> */}
        </div>
      </Link>

      {/* Content Section */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Recipe Name */}
        <div className="flex items-start justify-between gap-3">
          <Link href={`/recipes/${id}`} className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-base font-bold text-foreground transition-colors group-hover:text-primary">
              {name}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">{cuisine} Cuisine</p>
          </Link>
          <SaveRecipeButton
            recipe={currentRecipe}
            className="shrink-0"
          />
        </div>

        {/* Info Grid */}
        <Link href={`/recipes/${id}`} className="block">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-2.5 py-2 transition-colors group-hover:bg-primary/10">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-foreground">{cookTimeMinutes} min</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-2.5 py-2 transition-colors group-hover:bg-primary/10">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-foreground">{servings}</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-2.5 py-2 transition-colors group-hover:bg-primary/10">
              <Flame className="h-4 w-4 text-orange-500" />
              <span className="text-xs font-medium text-foreground">{caloriesPerServing} cal</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-muted/50 px-2.5 py-2 transition-colors group-hover:bg-primary/10">
              <ChefHat className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium text-foreground">{mealType.join(", ")}</span>
            </div>
          </div>
        </Link>
     
      </div>
    </div>
  )
}
