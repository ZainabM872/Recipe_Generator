import SearchBar from './components/SearchBar';
import { fetchRecipes } from './services/spoonacular';
import './index.css';
import { useState } from 'react';

type Recipe = {
  title: string;
  usedIngredients: { name: string }[];
  missedIngredients: { name: string }[];
};

function App() {
  const [recipes, setRecipes] = useState([]);
  const [ingredient, setIngredient] = useState("");

  const onSearch = async (ingredients: string) => {
    setIngredient(ingredients);
    const data = await fetchRecipes(ingredients);
    setRecipes(data);
  };

  const filterRecipes = (recipes: Recipe[], ingredientVar: string): Recipe[] => {
    const ingredientList = ingredientVar.toLowerCase().split(",").map(s => s.trim());

    return recipes.filter(recipe =>
      // check if any ingredient in the recipe matches any in the list
      recipe.usedIngredients.some(ri =>
        ingredientList.includes(ri.name.toLowerCase())
      )
    );
  };
  const filteredRecipes = filterRecipes(recipes, ingredient);

  return (
    <div className="pt-28">
      <SearchBar onSearch={onSearch} />
      <h2>
        {
          recipes.length === 0
          ? "There are no recipe results for your ingredient list"
            : (
              <ul>
                {filteredRecipes.map(r => (
                  <li key={r.id}>{r.title}</li>
                ))}
              </ul>
            )
        }
      </h2>
      <div className="p-8">
        <h1 className="text-3xl ">Recipe Generator</h1> 
      </div>
    </div>
  );
}

export default App;