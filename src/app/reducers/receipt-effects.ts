import {Injectable} from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {ReceiptService} from "../service/receipt/receipt.service";
import {catchError, exhaustMap, map, of, tap} from "rxjs";
import {getRecipes, getRecipesFailure, getRecipesSuccess} from "./rceipt-actions";

@Injectable()
export class ReceiptEffects {

  constructor(
    private actions$: Actions,
    private receiptService: ReceiptService
  ) {}

  getRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getRecipes),
        exhaustMap(action => this.receiptService.getRecipes().pipe(
          map(response =>
            getRecipesSuccess({response})
          ), catchError((error: any) => of(getRecipesFailure(error))))
        ))
  );
}
