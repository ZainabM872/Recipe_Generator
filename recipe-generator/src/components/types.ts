export type Recipe = {
    id: number;
    title: string;
    usedIngredients: { name: string }[];
    missedIngredients: { name: string }[];
};