import {Injectable} from "@angular/core";
import {act, Actions, createEffect, ofType} from "@ngrx/effects";
import {UserService} from "../service/user/user.service";
import {getRecipes, getRecipesFailure} from "./receipt-actions";
import {DO_LOGIN, DO_LOGOUT, DO_REGISTER, doLogin, doLoginSuccess, doRegisterSuccess} from "./login-actions";
import {catchError, map, mergeMap, of, tap} from "rxjs";
import {User} from "../model/user/user";
import {Router} from "@angular/router";

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private _router: Router
  ) {}

  getRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DO_LOGIN),
      mergeMap((action: {username: string, password: string}) => this.userService.login(action).pipe(map((response: User) => doLoginSuccess(response)),
        catchError((error: any) => of(getRecipesFailure(error))))
      )));

  doRegister$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DO_REGISTER),
      mergeMap((action: {username: string, password: string}) => this.userService.register(action).pipe(map((response: User) => doRegisterSuccess(response)),
        catchError((error: any) => of(getRecipesFailure(error))))
      )));

  doLogout$ = createEffect( () =>
    this.actions$.pipe(
      ofType(DO_LOGOUT),
      tap(() => {
        this._router.navigateByUrl("/login");
      })
    ),{dispatch: false}
  )
}
