import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {IngredientService} from "../../service/ingredient/ingredient.service";
import {map, mergeMap} from "rxjs";
import {changeIngredientStatus, getIngredients, getIngredientsSuccess} from "./ingredients-actions";
import {Ingredient} from "../../model/Ingredient";
import {IngredientState} from "./ingredients-reducer";
import {toIngredientCard} from "../../utility/utility";

@Injectable()
export class IngredientsEffects {

  constructor(
    private actions$: Actions,
    private ingredientsService: IngredientService,
  ) {
  }

  getIngredients$ = createEffect(() =>
    this.actions$.pipe(ofType(getIngredients),
      mergeMap((payload) => this.ingredientsService.getAllIngredients(payload.have).pipe(
        map(notHave => {
          return ({
            cards: [
              ...payload.have.map((x: Ingredient) => toIngredientCard(x, true)),
              ...notHave.map(x => toIngredientCard(x, false))]
          } as IngredientState);
        }),
        map(ingredientState => getIngredientsSuccess(ingredientState)),
        )
      )
    ));

  addIngredient$ = createEffect(() => {
      return this.actions$.pipe(ofType(changeIngredientStatus),
        map((payload) =>
          this.ingredientsService
            .changeIngredientStateValue(payload.card.ingredient, payload.currUser.username)
            .subscribe(x => x)
        ),
      );
    }, {dispatch: false}
  )
}
