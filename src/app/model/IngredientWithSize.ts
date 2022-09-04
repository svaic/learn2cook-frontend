import {Ingredient} from "./Ingredient";
import {IngredientType} from "./enumerable/IngredientType";

export interface IngredientWithSize {
  id: number,
  ingredient: Ingredient,
  count: number,
  sizeType: IngredientType
}
