import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {IngredientService} from "../../service/ingredient/ingredient.service";
import {map, mergeMap} from "rxjs";
import {changeIngredientStatus, getIngredients, getIngredientsSuccess} from "./ingredients-actions";
import {IngredientState} from "./ingredients-reducer";
import {toIngredientCard} from "../../utility/utility";
import {Ingredient} from "../../model/Ingredient";
import {Store} from "@ngrx/store";

@Injectable()
export class IngredientsEffects {

  getIngredients$ = createEffect(() =>
    this.actions$.pipe(ofType(getIngredients),
      mergeMap((payload) => this.ingredientsService.getAllIngredients().pipe(
        map(all => {
          return ({
            cards:
              all.map(x=>ingredientsToIngredientCard(x, payload.have))
          } as IngredientState);
        }),
        map(ingredientState => getIngredientsSuccess(ingredientState)),
/*        tap(() => this.store.dispatch(getRecipes()))*/
        )
      )
    ));

  addIngredient$ = createEffect(() =>
    this.actions$.pipe(ofType(changeIngredientStatus),
      mergeMap((payload) =>
          this.ingredientsService
            .changeIngredientStateValue(payload.card)
      ),
    ), {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private ingredientsService: IngredientService,
    private store: Store
  ) {
  }
}

const ingredientsToIngredientCard = (ingredient: Ingredient, have: Ingredient[]) => {
  return have.find(x => x.id === ingredient.id) ? toIngredientCard(ingredient, true) : toIngredientCard(ingredient, false)
}
