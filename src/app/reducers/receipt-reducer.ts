import {Action, createReducer, on} from "@ngrx/store";
import * as ReceiptActions from "./rceipt-actions";

export interface State {
  recipes?: [];
  user: any;
}

export const initialState: State = {
  recipes: [],
  user: undefined
}

export const receiptReducer = createReducer(
  initialState,
  on(ReceiptActions.getRecipesSuccess, (state, response) => ({...state, recipes: response}))
)
