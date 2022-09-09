import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ReceiptService} from "../../service/receipt/receipt.service";
import {catchError, map, mergeMap, of} from "rxjs";
import {getRecipes, getRecipesFailure, getRecipesSuccess} from "./receipt-actions";
import {RecipesResponse} from "../../model/response/RecipesResponse";

@Injectable()
export class ReceiptEffects {

  constructor(
    private actions$: Actions,
    private receiptService: ReceiptService
  ) {
  }

  getRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRecipes),
        mergeMap(() => this.receiptService.getRecipes().pipe(
          map((response: RecipesResponse) =>
            getRecipesSuccess(response)
          ), catchError((error: any) => of(getRecipesFailure(error))))
        ))
  );
}
