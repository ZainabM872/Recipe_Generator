export async function fetchRecipes(ingredients: string) {
    try {
        const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
        const params = new URLSearchParams({
        ingredients,
        apiKey,
        number: '10', // limits api results to 10 recipies
        });

        const response = await fetch(
        `https://api.spoonacular.com/recipes/findByIngredients?${params}`
        );

        // the user input: lowercase and .includes(the name attribute in the api result)
        if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        console.log("hello", data);
        return data;
    }
    catch (error) {
        console.error('Failed to fetch recipes:', error);
        throw error;
    }
}