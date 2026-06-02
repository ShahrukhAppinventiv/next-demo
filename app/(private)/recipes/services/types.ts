interface Recipe {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  cookTimeMinutes: number;
  difficulty: string;
  cuisine: string;
  servings: number;
  caloriesPerServing: number;
  prepTimeMinutes: number;
  ingredients: string[];
  instructions: string[];
  tags: string[];
  mealType: string[];
}