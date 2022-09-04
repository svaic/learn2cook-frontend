import {RecipesResponse} from "../model/response/RecipesResponse";
import {Receipt} from "../model/Receipt";
import {Action, createReducer, on} from "@ngrx/store";
import * as ReceiptActions from "./rceipt-actions";

export interface State {
  recipes?: RecipesResponse;
  currentReceipt?: Receipt;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
}

export const initialState: State = {
  recipes: undefined,
  currentReceipt: undefined,
  isLoading: undefined,
  isLoadingSuccess: undefined
}

export const receiptReducer = createReducer(
  initialState,

  on(ReceiptActions.getRecipes, (state) => ({...state, isLoading: true})),
  on(ReceiptActions.getRecipesSuccess, (state, response) => ({recipes: response, isLoading: true, isLoadingSuccess: true}))
)



export const getRecepis = (state: State) => {
  return {
    tasks: state.recipes,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  };
};
