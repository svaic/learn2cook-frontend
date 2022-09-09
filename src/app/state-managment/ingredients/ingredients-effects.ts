import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {IngredientService} from "../../service/ingredient/ingredient.service";
import {map, mergeMap, tap} from "rxjs";
import {changeIngredientStatus, getIngredients, getIngredientsSuccess} from "./ingredients-actions";
import {IngredientState} from "./ingredients-reducer";
import {toIngredientCard} from "../../utility/utility";
import {IngredientWithSize} from "../../model/IngredientWithSize";
import {updateUserData} from "../auth/auth-actions";
import {getRecipes} from "../receipt/receipt-actions";
import {Store} from "@ngrx/store";

@Injectable()
export class IngredientsEffects {

  constructor(
    private actions$: Actions,
    private ingredientsService: IngredientService,
    private store: Store
  ) {
  }

  getIngredients$ = createEffect(() =>
    this.actions$.pipe(ofType(getIngredients),
      mergeMap((payload) => this.ingredientsService.getAllIngredients(payload.have).pipe(
        map(notHave => {
          return ({
            cards: [
              ...payload.have.map((x: IngredientWithSize) => toIngredientCard(x, true)),
              ...notHave.map(x => toIngredientCard(x, false))]
          } as IngredientState);
        }),
        map(ingredientState => getIngredientsSuccess(ingredientState)),
        tap(() => this.store.dispatch(getRecipes()))
        )
      )
    ));

  addIngredient$ = createEffect(() =>
    this.actions$.pipe(ofType(changeIngredientStatus),
      mergeMap((payload) =>
        this.ingredientsService
          .changeIngredientStateValue(payload.card, payload.currUser.username)
          .pipe(map((x) => updateUserData(x)))
      ),
    )
  )
}
