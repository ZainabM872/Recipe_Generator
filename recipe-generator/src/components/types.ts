export type Recipe = {
    id: number;
    image: string;
    title: string;
    usedIngredients: { name: string }[];
    missedIngredients: { name: string }[];
};