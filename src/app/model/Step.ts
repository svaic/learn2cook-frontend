import {IngredientWithSize} from "./IngredientWithSize";

export interface Step {
  id: any,
  stepNumber: number,
  pictureUrl: string,
  ingredientsUsed: Array<IngredientWithSize>,
  description: string,
  duration: any
}
