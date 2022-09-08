import {ReceiptDifficulty} from "../model/enumerable/ReceiptDifficulty";
import * as moment from "moment";
import {Ingredient} from "../model/Ingredient";
import {IngredientCard} from "../state-managment/ingredients/ingredients-reducer";
import {IngredientWithSize} from "../model/IngredientWithSize";
import {IngredientSizeType} from "../model/enumerable/IngredientSizeType";

export type mapEnum<e extends string | symbol | number, v> = {
  [k in e]: v;
}

export interface ReceiptDifficultyData {
  value: string,
  picture: string
}

export const mapDifficulty: mapEnum<ReceiptDifficulty, ReceiptDifficultyData> = {
  [ReceiptDifficulty.EASY]: {value: 'лесно', picture: 'easy.png'},
  [ReceiptDifficulty.MEDIUM]: {value: 'средно', picture: 'medium.png'},
  [ReceiptDifficulty.HARD]: {value: 'тешко', picture: 'hard.png'},
}

export const parseDuration = (duration: string) => {
  return moment.duration(duration).asMinutes();
}

export const toIngredientCard = (ingredient: IngredientWithSize, inCard: boolean): IngredientCard => {
  return {ingredientWithSize: ingredient, inCard};
}

export const toIngredientWithSize = (ingredient: Ingredient): IngredientWithSize => {
  return {id: -1, ingredient: ingredient, count: 1, sizeType: IngredientSizeType.X};
}
