import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UserService} from "../../service/user/user.service";
import * as AuthAction from "./auth-actions";
import {catchError, map, mergeMap, of, tap} from "rxjs";
import {User} from "../../model/user/user";
import {Router} from "@angular/router";
import {showNotification} from "../notification/notification-actions";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class AuthEffects {

  getRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.DO_LOGIN),
      mergeMap((action: { username: string, password: string }) => this.userService.login(action)
        .pipe(
          map((response: User) => AuthAction.doLoginSuccess(response)),
          tap(x => this._router.navigateByUrl("/home")),
          catchError((error: HttpErrorResponse) => of(AuthAction.doLoginFailure(error))))
      )));

  doRegister$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.DO_REGISTER),
      mergeMap((action: { username: string, password: string }) =>
        this.userService.register(action)
          .pipe(
            map((response: User) => AuthAction.doRegisterSuccess(response)),
            tap(x => this._router.navigateByUrl("/home")),
            catchError((error: any) => of(AuthAction.doLoginFailure(error))))
      )));

  doLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.DO_LOGOUT),
      tap(() => {
        this._router.navigateByUrl("/login");
      })
    ), {dispatch: false}
  )

  failedLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.DO_LOGIN_FAILURE),
      map((error: HttpErrorResponse) => showNotification({
        title: 'could not login',
        text: error.error.message,
        color: 'danger'
      }))
    ))

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private _router: Router
  ) {
  }
}
