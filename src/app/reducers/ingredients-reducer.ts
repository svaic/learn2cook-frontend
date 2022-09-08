import {createReducer, on} from "@ngrx/store";
import * as ingredientsActions from '../reducers/ingredients-actions'
import {IngredientCard, IngredientState} from './ingredients-actions'

export const initialState: IngredientState = {
  cards: [],
}

export const ingredientsReducer = createReducer(
  initialState,
  on(ingredientsActions.getIngredientsSuccess, (state, ingredients: IngredientState) => ingredients),
  on(ingredientsActions.addIngredient,
    (state, ingredientCard: IngredientCard) => {
      return !state.cards.find(x => x.ingredient.id === ingredientCard.ingredient.id) ?
        {...state, cards: [...state.cards, ingredientCard]} : state;
    }),
  on(ingredientsActions.changeIngredientStatus,
    (state, payload) => {
      const cards = state.cards.map((value) => value.ingredient.id === payload.card.ingredient.id ? {
        ...value,
        inCard: !value.inCard
      } : value);
      return {...state, cards};
    })
)
