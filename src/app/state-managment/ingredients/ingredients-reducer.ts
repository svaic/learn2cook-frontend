import {createReducer, on} from "@ngrx/store";
import * as ingredientsActions from './/ingredients-actions'
import {IngredientWithSize} from "../../model/IngredientWithSize";

export interface IngredientCard {
  ingredientWithSize: IngredientWithSize,
  inCard: boolean
}

export interface IngredientState {
  cards: IngredientCard[],
}

export const initialState: IngredientState = {
  cards: [],
}

export const ingredientsReducer = createReducer(
  initialState,
  on(ingredientsActions.getIngredientsSuccess, (state, ingredients: IngredientState) => ingredients),
  on(ingredientsActions.addIngredient,
    (state, ingredientCard: IngredientCard) => {
      return !state.cards.find(x => x.ingredientWithSize.ingredient.id === ingredientCard.ingredientWithSize.id) ?
        {...state, cards: [...state.cards, ingredientCard]} : state;
    }),
  on(ingredientsActions.changeIngredientStatus,
    (state, payload) => {
      const cards = state.cards.map((value) => value.ingredientWithSize.ingredient.id === payload.card.ingredientWithSize.ingredient.id ? {
        ...value,
        inCard: !value.inCard
      } : value);
      return {...state, cards};
    })
)
