import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Clock, Users, Star } from "lucide-react"
import { getRecipeById } from "../services/action"
import { SaveRecipeButton } from "../components/save-recipe-button"
// import { Button } from "@/components/ui/button"

const recipes = [
    {
        id: 1,
        name: "Classic Margherita Pizza",
        image: "https://cdn.dummyjson.com/recipe-images/1.webp",
        rating: 4.6,
        reviewCount: 98,
        cookTimeMinutes: 15,
        prepTimeMinutes: 20,
        difficulty: "Easy",
        cuisine: "Italian",
        servings: 4,
        caloriesPerServing: 300,
        ingredients: [
            "Pizza dough",
            "Tomato sauce",
            "Fresh mozzarella cheese",
            "Fresh basil leaves",
            "Olive oil",
            "Salt and pepper to taste",
        ],
        instructions: [
            "Preheat the oven to 475°F (245°C).",
            "Roll out the pizza dough and spread tomato sauce evenly.",
            "Top with slices of fresh mozzarella and fresh basil leaves.",
            "Drizzle with olive oil and season with salt and pepper.",
            "Bake in the preheated oven for 12-15 minutes or until the crust is golden brown.",
            "Slice and serve hot.",
        ],
        tags: ["Pizza", "Italian"],
        mealType: ["Dinner"],
    },
    {
        id: 2,
        name: "Spaghetti Carbonara",
        image: "https://cdn.dummyjson.com/recipe-images/2.webp",
        rating: 4.8,
        reviewCount: 156,
        cookTimeMinutes: 20,
        prepTimeMinutes: 15,
        difficulty: "Medium",
        cuisine: "Italian",
        servings: 2,
        caloriesPerServing: 450,
        ingredients: [
            "Spaghetti",
            "Eggs",
            "Bacon",
            "Parmesan cheese",
            "Black pepper",
            "Salt",
        ],
        instructions: [
            "Cook spaghetti according to package directions.",
            "Fry bacon until crispy and chop.",
            "Whisk eggs with grated Parmesan.",
            "Toss hot pasta with bacon and egg mixture.",
            "Season with black pepper and serve immediately.",
        ],
        tags: ["Pasta", "Italian"],
        mealType: ["Dinner"],
    },
    {
        id: 3,
        name: "Thai Green Curry",
        image: "https://cdn.dummyjson.com/recipe-images/3.webp",
        rating: 4.7,
        reviewCount: 124,
        cookTimeMinutes: 25,
        prepTimeMinutes: 20,
        difficulty: "Medium",
        cuisine: "Thai",
        servings: 4,
        caloriesPerServing: 280,
        ingredients: [
            "Coconut milk",
            "Green curry paste",
            "Chicken breast",
            "Thai basil",
            "Fish sauce",
            "Lime juice",
        ],
        instructions: [
            "Heat coconut milk and curry paste in a pan.",
            "Add diced chicken and simmer until cooked.",
            "Add vegetables and simmer for 5-7 minutes.",
            "Season with fish sauce and lime juice.",
            "Garnish with Thai basil and serve with rice.",
        ],
        tags: ["Curry", "Thai"],
        mealType: ["Dinner"],
    },
    {
        id: 4,
        name: "Chocolate Brownies",
        image: "https://cdn.dummyjson.com/recipe-images/4.webp",
        rating: 4.9,
        reviewCount: 203,
        cookTimeMinutes: 30,
        prepTimeMinutes: 10,
        difficulty: "Easy",
        cuisine: "American",
        servings: 12,
        caloriesPerServing: 250,
        ingredients: [
            "Dark chocolate",
            "Butter",
            "Eggs",
            "Sugar",
            "Flour",
            "Baking powder",
        ],
        instructions: [
            "Preheat oven to 350°F.",
            "Melt chocolate and butter together.",
            "Mix eggs and sugar, combine with chocolate mixture.",
            "Fold in flour and baking powder.",
            "Pour into greased pan and bake for 25-30 minutes.",
            "Cool and cut into squares.",
        ],
        tags: ["Dessert", "Chocolate"],
        mealType: ["Dessert"],
    },
]
void recipes;

export default async function RecipeDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    // const recipe = recipes.find((r) => r.id === parseInt(id))
    const recipe = await getRecipeById(Number(id)) as Recipe | null;

    if (!recipe) {
        return (
            <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-2xl font-semibold text-foreground">
                        Recipe not found
                    </h1>
                    {/* <Link href="/recipes">
            <Button className="mt-6">Back to Recipes</Button>
          </Link> */}
                    <Link
                        href="/recipes"
                        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                    >
                        <ArrowLeft className="size-4" />
                        Back to Products
                    </Link>
                </div>
            </main>
        )
    }

    const difficultyColors = {
        Easy: "bg-green-100 text-green-700",
        Medium: "bg-yellow-100 text-yellow-700",
        Hard: "bg-red-100 text-red-700",
    }

    return (
        <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                {/* Back Button */}
                   <Link
                        href="/recipes"
                        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                    >
                        <ArrowLeft className="size-4" />
                        Back to Recipes
                    </Link>
                

                {/* Hero Image */}
                <div className="relative mb-8 h-96 overflow-hidden rounded-xl">
                    <Image
                        src={recipe.image}
                        alt={recipe.name}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <h1 className="text-balance text-4xl font-bold text-foreground">
                            {recipe.name}
                        </h1>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {recipe.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="inline-block rounded-full bg-card px-3 py-1 text-sm font-medium text-muted-foreground"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <SaveRecipeButton recipe={recipe} label className="shrink-0" />
                </div>

                {/* Quick Info */}
                <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="rounded-lg bg-card p-4 text-center">
                        <div className="flex justify-center">
                            <Star className="mb-2 h-5 w-5 fill-yellow-400 text-yellow-400" />
                        </div>
                        <p className="text-lg font-semibold text-foreground">
                            {recipe.rating}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            ({recipe.reviewCount} reviews)
                        </p>
                    </div>

                    <div className="rounded-lg bg-card p-4 text-center">
                        <div className="flex justify-center">
                            <Clock className="mb-2 h-5 w-5 text-primary" />
                        </div>
                        <p className="text-lg font-semibold text-foreground">
                            {recipe.cookTimeMinutes} min
                        </p>
                        <p className="text-xs text-muted-foreground">Cook time</p>
                    </div>

                    <div className="rounded-lg bg-card p-4 text-center">
                        <div className="flex justify-center">
                            <Users className="mb-2 h-5 w-5 text-primary" />
                        </div>
                        <p className="text-lg font-semibold text-foreground">
                            {recipe.servings}
                        </p>
                        <p className="text-xs text-muted-foreground">Servings</p>
                    </div>

                    <div className="rounded-lg bg-card p-4 text-center">
                        <div className="flex justify-center">
                            <span
                                className={`mb-2 inline-block rounded-full px-2 py-1 text-xs font-semibold ${difficultyColors[recipe.difficulty as keyof typeof difficultyColors]}`}
                            >
                                {recipe.difficulty}
                            </span>
                        </div>
                        <p className="text-xs text-muted-foreground">Difficulty</p>
                    </div>
                </div>

                {/* Details Grid */}
                <div className="mb-8 grid gap-8 sm:grid-cols-2">
                    {/* Ingredients */}
                    <div>
                        <h2 className="mb-4 text-2xl font-semibold text-foreground">
                            Ingredients
                        </h2>
                        <ul className="space-y-2">
                            {recipe.ingredients.map((ingredient, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <div className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                                    <span className="text-muted-foreground">{ingredient}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Info */}
                    <div>
                        <h2 className="mb-4 text-2xl font-semibold text-foreground">
                            Recipe Info
                        </h2>
                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-muted-foreground">Prep time</p>
                                <p className="font-semibold text-foreground">
                                    {recipe.prepTimeMinutes} minutes
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Cook time</p>
                                <p className="font-semibold text-foreground">
                                    {recipe.cookTimeMinutes} minutes
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Cuisine</p>
                                <p className="font-semibold text-foreground">{recipe.cuisine}</p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Calories per serving
                                </p>
                                <p className="font-semibold text-foreground">
                                    {recipe.caloriesPerServing} kcal
                                </p>
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">Meal type</p>
                                <p className="font-semibold text-foreground">
                                    {recipe.mealType.join(", ")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Instructions */}
                <div className="mb-8">
                    <h2 className="mb-4 text-2xl font-semibold text-foreground">
                        Instructions
                    </h2>
                    <ol className="space-y-4">
                        {recipe.instructions.map((instruction, idx) => (
                            <li key={idx} className="flex gap-4">
                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                                    {idx + 1}
                                </div>
                                <p className="pt-1 text-muted-foreground">{instruction}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </main>
    )
}
