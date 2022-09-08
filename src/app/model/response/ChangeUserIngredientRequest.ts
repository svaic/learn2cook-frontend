import {IngredientWithSize} from "../IngredientWithSize";

export interface ChangeUserIngredientRequest {
  ingredient: IngredientWithSize,
  addIngredient: boolean
}
