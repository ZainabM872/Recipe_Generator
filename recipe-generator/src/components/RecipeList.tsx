import { useMemo, useEffect } from "react";
import type { Recipe } from './types'; // No runtime import will be generated for Recipe.

// Define types for the props
interface RecipeListProps {
    sendFilteredRecipesToParent: (data: Recipe[]) => void;
    searched: boolean;
    allRecipes: Recipe[];
    searchIngredients: string;
}

function RecipeList({ sendFilteredRecipesToParent, searched, allRecipes, searchIngredients }: RecipeListProps) { 
    
    // Filter recipes based on whether any of the ingredients exist in the name property. useMemo ensures the fltering only happens when the ingredient list or returned recipes change (memoization)
    const filteredRecipes = useMemo(() => {
        const ingredientList = searchIngredients
            .toLowerCase()
            .split(",")
            .map(s => s.trim());
        
        return allRecipes.filter(recipe =>
            recipe.usedIngredients.some(usedIngredient =>
                // check if any ingredient from the list exists in ri.name
                ingredientList.some(searchTerm => usedIngredient.name.toLowerCase().includes(searchTerm))
            )
        );
    }, [searchIngredients, allRecipes]);

    // Call the parent callback only when filteredRecipes changes
    useEffect(() => {
        sendFilteredRecipesToParent(filteredRecipes);
    }, [filteredRecipes, sendFilteredRecipesToParent]);

    return (
        <>
            {searched && allRecipes.length === 0 && (
                <h2>There are no recipe results for your ingredient list</h2>
            )}
        </>
    );
}

export default RecipeList; 