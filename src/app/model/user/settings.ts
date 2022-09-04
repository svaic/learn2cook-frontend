import {Ingredient} from "../Ingredient";
import {MealPeriod} from "./mealPeriod";

export interface Settings {
  filterIngredients: Array<Ingredient>;
  breakfast: MealPeriod;
  lunch: MealPeriod;
  dinner: MealPeriod;
  maxCalories: number;
  isVegan: boolean;
}
