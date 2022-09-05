import {ReceiptDifficulty} from "../model/enumerable/ReceiptDifficulty";

export type mapEnum<e extends string | symbol | number,v> ={
  [k in e] : v;
}

export interface ReceiptDifficultyData {
  value: string,
  picture: string
}

export const mapDifficulty: mapEnum<ReceiptDifficulty, ReceiptDifficultyData> = {
  [ReceiptDifficulty.EASY]: {value: 'лесно', picture:'easy.png'},
  [ReceiptDifficulty.MEDIUM]: {value: 'средно', picture:'medium.png'},
  [ReceiptDifficulty.HARD]: {value: 'тешко', picture:'hard.png'},
  }