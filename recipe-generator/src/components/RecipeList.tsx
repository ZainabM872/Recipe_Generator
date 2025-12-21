import { useMemo } from "react";

type Recipe = {
    id: number;
    title: string;
    usedIngredients: { name: string }[];
    missedIngredients: { name: string }[];
};

interface RecipeListProps {
    searched: boolean;
    allRecipes: Recipe[];
    searchIngredients: string;
}

function RecipeList({ searched, allRecipes, searchIngredients }: RecipeListProps) { 
    
    const filteredallRecipes = useMemo(() => {
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


    return (
        <>
            {
                searched && allRecipes.length === 0 &&
                (
                    <h2>There are no recipe results for your ingredient list</h2>
                )
            }
            {
                allRecipes.length > 0 &&
                (
                    <ul>
                        {filteredallRecipes.map(r => (
                            <li key={r.id}>{r.title}</li>
                        ))}
                    </ul>
                )
            }
        </>
    );
}

export default RecipeList; 