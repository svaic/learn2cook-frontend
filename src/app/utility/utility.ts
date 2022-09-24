import {ReceiptDifficulty} from "../model/enumerable/ReceiptDifficulty";
import * as moment from "moment";
import {IngredientCard} from "../state-managment/ingredients/ingredients-reducer";
import {IngredientWithSize} from "../model/IngredientWithSize";
import {ReceiptType} from "../model/enumerable/ReceiptType";
import {User} from "../model/user/user";
import {MealPeriod} from "../model/user/mealPeriod";
import {BuildReceipt} from "../model/response/BuildReceipt";

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

export const getPointsNotificationText = (points: number) => 'you have now ' + points + ' points'

export const getTimeToEat = (user: User): ReceiptType => {
  if (isMealForNow(user.settings.breakfast)) return ReceiptType.BREAKFAST;
  if (isMealForNow(user.settings.lunch)) return ReceiptType.LUNCH;
  if (isMealForNow(user.settings.dinner)) return ReceiptType.DINNER;
  return ReceiptType.ALL;
}

export const isMealForNow = (meal: MealPeriod): boolean => {
  const now = new Date();

  const from = createDate(meal.fromTime as string);
  const to = createDate(meal.toTime);

  return inBetweenTwoDates(from, to, now);
}

export const createDate = (t: string) => {
  const newDate = new Date();
  const [hours, minutes] = t.split(':');

  newDate.setHours(+hours);
  newDate.setMinutes(+minutes);

  return newDate;
}

export const inBetweenTwoDates = (from: Date, to: Date, time: Date) => {
  return from.getTime() <= time.getTime() && time.getTime() <= to.getTime();
}

export const toBuildReceipt = (receipt: BuildReceipt, ingredients: IngredientCard[]): BuildReceipt => {
  for (const ingredientOfReceipt of receipt.receipt.ingredients) {
    const userIngredient = ingredients.find(x=>x.ingredientWithSize.ingredient.id === ingredientOfReceipt.ingredient.id)
    if (userIngredient && !userIngredient.inCard) {
      return {receipt: receipt.receipt, canMake: false};
    }
  }

  return {receipt: receipt.receipt, canMake: true};
}
