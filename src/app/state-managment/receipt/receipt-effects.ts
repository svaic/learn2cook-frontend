import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ReceiptService} from "../../service/receipt/receipt.service";
import {catchError, map, mergeMap, of, tap} from "rxjs";
import {getRecipes, getRecipesFailure, getRecipesSuccess} from "./receipt-actions";
import {RecipesResponse} from "../../model/response/RecipesResponse";
import {Store} from "@ngrx/store";
import {IngredientCard, IngredientState} from "../ingredients/ingredients-reducer";

@Injectable()
export class ReceiptEffects {

  ingredientCards: IngredientCard[] = [];
  getRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRecipes),
      mergeMap(() => {
        if (this.ingredientCards.length == 0) throw null;
        else
          return this.receiptService.getRecipes(this.ingredientCards).pipe(tap(x => console.log(x)),
            map((response: RecipesResponse) => {
                return getRecipesSuccess(response)
              }
            ), catchError((error: any) => of(getRecipesFailure(error))));
        }
      ))
  );

  constructor(
    private actions$: Actions,
    private receiptService: ReceiptService,
    private store: Store<{ ingredient: IngredientState }>
  ) {
    this.store.select(x => x.ingredient).subscribe(x => {
      if (x.cards.length > 0) {
        this.ingredientCards = x.cards
      }
    });
  }
}
