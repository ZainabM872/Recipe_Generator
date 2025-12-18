import { useState } from "react";

function SearchBar({ onSearch }) {
    const [search, setSearch] = useState("");

    const handleKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onSearch(search);
            setSearch(""); // Clear the input
        }
    };

    return (
        <div className="w-full px-8 py-4 fixed top-0 left-0 z-50">
            <input
                id="recipe-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Enter ingredients..."
                className="w-full px-4 py-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-0 bg-white text-gray-800"
                onKeyDown={handleKeyPressed}
            />
        </div>
    );
}

export default SearchBar;