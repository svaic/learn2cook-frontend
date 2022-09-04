import {Action, createAction, props} from "@ngrx/store";

export const GET_RECIPES = '[Task] Get Tasks';

export const GET_RECIPES_SUCCESS = '[Task] Get RECIPES Success';

export const GET_RECIPES_FAILURE = '[Task] Get RECIPES Failure';

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
