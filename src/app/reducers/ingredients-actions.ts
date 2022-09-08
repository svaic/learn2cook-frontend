import {createAction, props, Store} from "@ngrx/store";
import {Ingredient} from "../model/Ingredient";
import {User} from "../model/user/user";
import {IngredientType} from "../model/enumerable/IngredientType";
import {map} from "rxjs";

export const GET_INGREDIENTS = "[ING] get fridge";

export const GET_INGREDIENTS_SUCCESS = "[ING] get fridge success";

export const ADD_INGREDIENTS = "[ING] add to fridge";

export const REMOVE_INGREDIENTS = "[ING] remove from fridge";

export const CHANGE_INGREDIENT = "[ING] change ingredient";

export interface IngredientCard {
  ingredient: Ingredient,
  inCard: boolean
}

export interface IngredientState {
  cards: IngredientCard[],
}

export const getPipeForItems = (store: Store<{ ingredient: any }>, type: IngredientType) =>
  store.select("ingredient")
    .pipe(map((state: IngredientState) =>
      ({cards: state.cards.filter((x: IngredientCard) => x.ingredient.type == type)})
    ));

export const getIngredients = createAction(
  GET_INGREDIENTS,
  props<any>()
)

export const getIngredientsSuccess = createAction(
  GET_INGREDIENTS_SUCCESS,
  props<IngredientState>()
)

export const addIngredient = createAction(
  ADD_INGREDIENTS,
  props<IngredientCard>()
)

export const changeIngredientStatus = createAction(
  CHANGE_INGREDIENT,
  props<{ card: IngredientCard, currUser: User }>()
)

export const RemoveIngredient = createAction(
  REMOVE_INGREDIENTS,
  props<IngredientCard>()
)
