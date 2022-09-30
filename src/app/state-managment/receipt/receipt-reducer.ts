import {on} from "@ngrx/store";
import * as ReceiptActions from "./receipt-actions";
import {RecipesResponse} from "../../model/response/RecipesResponse";
import {createRehydrateReducer} from "ngrx-rehydrate";
import {BuildReceipt} from "../../model/response/BuildReceipt";
import {ReceiptType} from "../../model/enumerable/ReceiptType";
import {toBuildReceipt} from "../../utility/utility";

export interface State {
  recipes: BuildReceipt[];
  filter?: ReceiptType
}

export const initialState: State = {
  recipes: [],
}

export const receiptReducer = createRehydrateReducer(
  {key: 'ReceiptKey'},
  initialState,
  on(ReceiptActions.getRecipesSuccess, (state, response: RecipesResponse) => ({...state, recipes: response.recipes})),
  on(ReceiptActions.setReceiptType, (state, props) => ({...state, filter: props.filter})),
  on(ReceiptActions.updateRecipes, (state, props) => {
    return ({...state, recipes: state.recipes.map(receipt => toBuildReceipt(receipt.receipt, props.ingredients))})
  })
)
