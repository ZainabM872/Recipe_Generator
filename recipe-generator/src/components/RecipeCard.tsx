import { useState } from "react";
import type { Recipe } from "./types";

interface RecipeCardProps {
    recipeToDisplay: Recipe;
}

function RecipeCard({ recipeToDisplay }: RecipeCardProps) {
    const [imageError, setImageError] = useState(false);

    // Each recipeToDisplay will be displayed as a card
    // Each card will have a title, image, matching (usedIngredients) and needed ingredient (missingIngredients) count on the card
    // The cards will be arranged sequentially in rows and be of the same size
    // The cards will be ordered. The recipeToDisplays that have the highest matching ingredient count will be first
    // If its a tie, the recipeToDisplay with the smallest needed ingredient count will be first.
    // If thats a tie as well, order alphabetically

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            {/* Title */}
            <h3 className="text-lg font-semibold p-4 text-black">{recipeToDisplay.title}</h3>

            {/* Image */}
            {imageError ? (
                <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-red-500">
                    Image failed to load
                </div>
            ) : (
                <img
                    src={recipeToDisplay.image}
                    alt={recipeToDisplay.title}
                    className="w-full h-48 object-cover"
                    onError={() => setImageError(true)}
                />
            )}

            {/* Ingredients */}
            <div className="p-4 flex flex-col flex-1 text-sm">
                <div className="text-gray-700 mb-2">
                    <strong>Matching ingredients:</strong>{" "}
                    {recipeToDisplay.usedIngredients.map((ing) => ing.name).join(", ") || "None"}
                </div>
                <div className="text-gray-500">
                    <strong>Missing ingredients:</strong>{" "}
                    {recipeToDisplay.missedIngredients.map((ing) => ing.name).join(", ") || "None"}
                </div>
            </div>
        </div>
    );
}
export default RecipeCard;