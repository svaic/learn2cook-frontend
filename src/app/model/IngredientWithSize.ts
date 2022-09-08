import {Ingredient} from "./Ingredient";
import {IngredientSizeType} from "./enumerable/IngredientSizeType";

export interface IngredientWithSize {
  id?: number,
  ingredient: Ingredient,
  count: number,
  sizeType: IngredientSizeType
}
