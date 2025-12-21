import SearchBar from './components/SearchBar';
import { fetchRecipes } from './services/spoonacular';
import './index.css';
import { useState } from 'react';
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

  return (
    <div className="pt-28">
      <SearchBar onSearch={onSearch} />
      <RecipeList sendFilteredRecipesToParent={handleFilteredRecipes} searched={hasSearched} allRecipes={recipes} searchIngredients={ingredient} />

      {filteredRecipes.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4">
          {filteredRecipes.map(recipe => (
            <RecipeCard recipeToDisplay={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;