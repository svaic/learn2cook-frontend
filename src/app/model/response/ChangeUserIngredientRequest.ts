import {Ingredient} from "../Ingredient";

export interface ChangeUserIngredientRequest {
  ingredient: Ingredient,
  addIngredient: boolean
}
