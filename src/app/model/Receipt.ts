import {FoodCategory} from "./enumerable/FoodCategory";
import {IngredientWithSize} from "./IngredientWithSize";
import {ReceiptDifficulty} from "./enumerable/ReceiptDifficulty";
import {Step} from "./Step";
import {ReceiptType} from "./enumerable/ReceiptType";
import {Duration} from "tinyduration";

export interface Receipt {
  id: number,
  name: string,
  category: FoodCategory,
  ingredients: Array<IngredientWithSize>,
  kitchenEquipment: IngredientWithSize,
  pictureUrl: string
  steps: Array<Step>,
  timeToPrepare: string,
  difficulty: ReceiptDifficulty,
  type: ReceiptType,
  calories: number
}
