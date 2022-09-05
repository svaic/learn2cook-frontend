import {Injectable} from "@angular/core";
import {act, Actions, createEffect, ofType} from "@ngrx/effects";
import {UserService} from "../service/user/user.service";
import {getRecipes, getRecipesFailure} from "./receipt-actions";
import {DO_LOGIN, doLogin, doLoginSuccess} from "./login-actions";
import {catchError, map, mergeMap, of} from "rxjs";
import {User} from "../model/user/user";

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}

  getRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DO_LOGIN),
      mergeMap((action: {username: string, password: string}) => this.userService.login(action).pipe(map((response: User) => doLoginSuccess(response)),
        catchError((error: any) => of(getRecipesFailure(error))))
      )));
}
