
function SearchBar() {
    return (
        <div className="w-full px-8 py-4 fixed top-0 left-0 z-50">
            <input
                type="text"
                placeholder="Enter ingredients..."
                className="w-full px-4 py-3 text-lg rounded-lg border-2 border-gray-300  focus:outline-none focus:ring-0 bg-white text-gray-800"
            />
        </div>
    );
}

export default SearchBar;