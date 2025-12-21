import { useState } from "react";

interface SearchBarProps {
    onSearch: (ingredients: string) => void,
}

function SearchBar({ onSearch }: SearchBarProps) {
    const [search, setSearch] = useState("");
    const regex = /[^a-zA-Z, ]/;

    const handleKeyPressed = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const invalidInput = regex.test(search);
        if (event.key === "Enter") {
            if (search.trim().length > 0 && !invalidInput) {
                onSearch(search);
            }
            else if (search.trim().length === 0) {
                alert("Please enter at least one ingredient.");
            }
            else if (invalidInput) {
                alert("Please enter a valid list of ingredients.");
            }
            setSearch(""); // Clear the input
        }
    };

    return (
        <div className="w-full px-8 py-4 fixed top-0 left-0 z-50">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
                placeholder="Enter ingredients..."
                className="w-full px-4 py-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-0 bg-white text-gray-800"
                onKeyDown={handleKeyPressed}
            />
        </div>
    );
}

export default SearchBar;