import {createReducer, on} from "@ngrx/store";
import * as IngredientsActions from './/ingredients-actions'
import {Ingredient} from "../../model/Ingredient";

export interface IngredientCard {
  ingredient: Ingredient,
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
  on(IngredientsActions.getIngredientsSuccess, (state, ingredients: IngredientState) => ingredients),
  on(IngredientsActions.addIngredient,
    (state, ingredientCard: IngredientCard) => {
      return !state.cards.find(x => x.ingredient.id === ingredientCard.ingredient.id) ?
        {...state, cards: [...state.cards, ingredientCard]} : state;
    }),
  on(IngredientsActions.changeIngredientStatus,
    (state, payload) => {
      const cards = state.cards
        .map(
          (value) => value.ingredient.id === payload.card.ingredient.id ? {
            ...value,
            inCard: !value.inCard
          } : value
        );
      return {...state, cards};
    })
)
