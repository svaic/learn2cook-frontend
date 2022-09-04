import {IngredientType} from "./enumerable/IngredientType";

export interface Ingredient {
  id: number,
  name: string,
  pictureUrl: string,
  type: IngredientType
}
