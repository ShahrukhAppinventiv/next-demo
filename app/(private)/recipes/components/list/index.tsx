"use client"
import { useMemo, useState } from "react";
import { SearchBar } from "@/app/components/search/Search";
import { RecipeCard } from "../recipe-card"
import { useRecipeListHelper } from "./helper";
import { setRecipeSearchQuery } from "../../services/slice";
import RecipeListingLoading from "../../loading";
import { cn } from "@/app/lib/utils";

const difficultyFilters = ["Easy", "Medium"];


const RecipesList = () => {
    const { dispatch, searchQuery, recipeList, loading } = useRecipeListHelper();
    const [selectedMealTypes, setSelectedMealTypes] = useState<string[]>([]);
    const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);

    const mealTypeFilters = useMemo(() => {
        const mealTypes = recipeList.flatMap((recipe) => recipe.mealType);
        return Array.from(new Set(mealTypes));
    }, [recipeList]);

    const filteredRecipes = useMemo(() => {
        return recipeList.filter((recipe) => {
            const matchesMealType =
                selectedMealTypes.length === 0 ||
                recipe.mealType.some((mealType) => selectedMealTypes.includes(mealType));
            const matchesDifficulty =
                selectedDifficulties.length === 0 ||
                selectedDifficulties.includes(recipe.difficulty);

            return matchesMealType && matchesDifficulty;
        });
    }, [recipeList, selectedDifficulties, selectedMealTypes]);

    const hasSelectedFilters =
        selectedMealTypes.length > 0 || selectedDifficulties.length > 0;

    const handleClearFilters = () => {
        setSelectedMealTypes([]);
        setSelectedDifficulties([]);
    };

    const toggleFilter = (
        value: string,
        selectedValues: string[],
        onChange: (values: string[]) => void,
    ) => {
        onChange(
            selectedValues.includes(value)
                ? selectedValues.filter((selectedValue) => selectedValue !== value)
                : [...selectedValues, value]
        );
    };

    const renderChip = (
        label: string,
        selectedValues: string[],
        onChange: (values: string[]) => void,
    ) => {
        const isActive = selectedValues.includes(label);

        return (
            <button
                key={label}
                type="button"
                onClick={() => toggleFilter(label, selectedValues, onChange)}
                className={cn(
                    "cursor-pointer rounded-full border px-5 py-2 text-sm font-medium transition",
                    isActive
                        ? "border-transparent bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-md"
                        : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-slate-900"
                )}
            >
                {label}
            </button>
        );
    };

    return (
        <main className="min-h-screen bg-background px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10 text-center">
                    <h1 className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                        Explore Recipes
                    </h1>
                    <p className="mt-3 text-pretty text-muted-foreground">
                        Discover delicious recipes from around the world
                    </p>
                </div>


                <div className="mb-8 rounded-lg border border-border/70 bg-card p-6 shadow-sm">
                    <SearchBar
                        placeholder='Search Recipe by Name ...'
                        value={searchQuery}
                        onChange={(value) => {
                            dispatch(setRecipeSearchQuery(value));
                        }}
                        inputClassName="rounded-full bg-white py-3"
                    />
                    <>
                        {filteredRecipes.length ?
                            <>
                                <div className="mt-5 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleClearFilters}
                                        disabled={!hasSelectedFilters}
                                        className={cn(
                                            "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition",
                                            hasSelectedFilters
                                                ? "border-indigo-200 bg-white text-slate-700 hover:border-fuchsia-300 hover:text-slate-950"
                                                : "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
                                        )}
                                    >
                                        Clear filters
                                    </button>
                                </div>

                                <div className="mt-6 flex flex-col gap-5">
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="text-sm font-medium text-muted-foreground">
                                            Meal Type:
                                        </span>
                                        {filteredRecipes.length && mealTypeFilters.map((mealType) =>
                                            renderChip(mealType, selectedMealTypes, setSelectedMealTypes)
                                        )}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <span className="text-sm font-medium text-muted-foreground">
                                            Difficulty:
                                        </span>
                                        {filteredRecipes.length && difficultyFilters.map((difficulty) =>
                                            renderChip(difficulty, selectedDifficulties, setSelectedDifficulties)
                                        )}
                                    </div>
                                </div>
                            </>
                            :
                            null
                        }
                    </>
                </div>
                {loading ? (
                    <RecipeListingLoading />
                ) : filteredRecipes.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredRecipes.map((recipe: Recipe) => (
                            <RecipeCard key={recipe.id} {...recipe} />
                        ))}
                    </div>
                ) : (
                    <div className="mx-auto max-w-xl rounded-lg   bg-card p-8 text-center">
                        <div className="mx-auto mb-4 w-24 text-muted-foreground">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-24 h-24 mx-auto">
                                <circle cx="11" cy="11" r="6" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" strokeLinecap="round" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-foreground">No recipe matchs your search</h2>
                        <p className="mt-2 text-sm text-muted-foreground">Try a different keyword or clear your search to see all products.</p>

                    </div>
                )}


            </div>
        </main>
    )
}

export default RecipesList
