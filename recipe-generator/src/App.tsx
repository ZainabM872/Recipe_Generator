import SearchBar from './components/SearchBar';
import { fetchRecipes } from './services/spoonacular';
import './index.css';
import { useState, useMemo } from 'react';
import RecipeList from './components/RecipeList';
import type { Recipe } from './components/types';
import RecipeCard from './components/RecipeCard';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  // retrieve results based on the ingredient list
  const onSearch = async (ingredients: string) => {
    setIngredient(ingredients);
    const data = await fetchRecipes(ingredients);
    setRecipes(data);
    setHasSearched(true);
  };

  // retrieve and store filtered recipies from RecipeList child component to be passed into the RecipeCard Component
  const handleFilteredRecipes = (data: Recipe[]) => {
    setFilteredRecipes(data);
  }

  // We need to sort the recipies for display (RecipeCard)
  // The cards will be ordered. The recipes that have the highest matching ingredient count will be first
  // If its a tie, the recipe with the smallest needed ingredient count will be first.
  // If thats a tie as well, order alphabetically
  const sortedRecipes = useMemo(() => {
    return [...filteredRecipes].sort((a, b) => {
      const usedDiff = b.usedIngredients.length - a.usedIngredients.length;
      if (usedDiff !== 0) return usedDiff;

      const missedDiff = a.missedIngredients.length - b.missedIngredients.length;
      if (missedDiff !== 0) return missedDiff;

      return a.title.localeCompare(b.title);
    });
  }, [filteredRecipes]);

  return (
    <div className="pt-28">
      <SearchBar onSearch={onSearch} />
      <RecipeList sendFilteredRecipesToParent={handleFilteredRecipes} searched={hasSearched} allRecipes={recipes} searchIngredients={ingredient} />

      {sortedRecipes.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
          {sortedRecipes.map(recipe => (
            <RecipeCard recipeToDisplay={recipe} /> // Each recipe needs to have its own state for error handling if the image isnt availiable, so they're passed into RecipeCard to be rendered individually
          ))}
        </div>
      )}
    </div>
  );
}

export default App;