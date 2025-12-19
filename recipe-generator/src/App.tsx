import SearchBar from './components/SearchBar';
import { fetchRecipes } from './services/spoonacular';
import './index.css';
import { useState } from 'react';

function App() {
  const [recipes, setRecipes] = useState([]);

  const onSearch = async (ingredients: string) => {
    const data = await fetchRecipes(ingredients);
    setRecipes(data);
  };

  return (
    <div className="pt-28">
      <SearchBar onSearch={onSearch} />
      <h2>
        {recipes.length === 0
          ? "There are no recipe results for your ingredient list"
          : recipes.map(r => r.title).join(", ")
        }
      </h2>
      <div className="p-8">
        <h1 className="text-3xl ">Recipe Generator</h1> 
      </div>
    </div>
  );
}

export default App;