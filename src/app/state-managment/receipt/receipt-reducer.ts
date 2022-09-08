import {on} from "@ngrx/store";
import * as ReceiptActions from "./receipt-actions";
import {Receipt} from "../../model/Receipt";
import {RecipesResponse} from "../../model/response/RecipesResponse";
import {createRehydrateReducer} from "ngrx-rehydrate";

export interface State {
  recipes: Receipt[];
}

export const initialState: State = {
  recipes: [],
}

export const receiptReducer = createRehydrateReducer(
  {key: 'ReceiptKey'},
  initialState,
  on(ReceiptActions.getRecipesSuccess, (state, response: RecipesResponse) => ({...state, recipes: response.recipes}))
)
