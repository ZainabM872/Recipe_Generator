import type { Recipe } from "./types";

interface RecipeCardProps {
    recipesToDisplay: Recipe[];
}

function RecipeCard({ recipesToDisplay }: RecipeCardProps) {
    // Each recipe will be displayed as a card
    // Each card will have a title, image, matching and needed ingredient count on the card
    // The cards will be arranged sequentially in rows and be of the same size
    // The cards will be ordered. The recipes that have the highest matching ingredient count will be first
    // If its a tie, the recipe with the smallest needed ingredient count will be first.
    // If thats a tie as well, order alphabetically
    
    return (
        <h2>hello</h2>
    );
}

export default RecipeCard;