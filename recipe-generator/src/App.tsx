import SearchBar from './components/SearchBar';
import './index.css';

function App() {
  return (
    <div className="pt-28"> {/* Pushes content below fixed search bar */}
      <SearchBar />
      <div className="p-8">
        <h1 className="text-3xl ">Recipe Generator hello</h1>

        {/* Other content like RecipeList */}
      </div>
    </div>
  );
}

export default App;