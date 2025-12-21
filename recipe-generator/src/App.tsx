import SearchBar from './components/SearchBar';
import { fetchRecipes } from './services/spoonacular';
import './index.css';
import { useState } from 'react';
import RecipeList from './components/RecipeList';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const onSearch = async (ingredients: string) => {
    setIngredient(ingredients);
    const data = await fetchRecipes(ingredients);
    setRecipes(data);
    setHasSearched(true);
  };

  return (
    <div className="pt-28">
      <SearchBar onSearch={onSearch} />
      <RecipeList searched={hasSearched} allRecipes={recipes} searchIngredients={ingredient} />

      <div className="p-8">
        <h1 className="text-3xl ">Recipe Generator</h1>
      </div>
    </div>
  );
}

export default App;