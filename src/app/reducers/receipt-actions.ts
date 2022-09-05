import {createAction, props} from "@ngrx/store";

export const GET_RECIPES = '[RECIPES] Get RECIPES';

export const GET_RECIPES_SUCCESS = '[RECIPES] Get RECIPES Success';

export const GET_RECIPES_FAILURE = '[RECIPES] Get RECIPES Failure';

export const getRecipes = createAction(
  GET_RECIPES
);

export const getRecipesSuccess = createAction(
  GET_RECIPES_SUCCESS,
  props<any>()
);

export const getRecipesFailure = createAction(
  GET_RECIPES_FAILURE,
  props<any>()
);
