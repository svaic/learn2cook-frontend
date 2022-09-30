import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {UserService} from "../../service/user/user.service";
import * as AuthAction from "./auth-actions";
import {catchError, map, mergeMap, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {showNotification} from "../notification/notification-actions";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../../model/user/user";

@Injectable()
export class AuthEffects {

  doLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.DO_LOGIN),
      mergeMap((action: { username: string, password: string }) =>
        this.userService.login(action)
          .pipe(
            map((user: User) => AuthAction.doLoginSuccess({user})),
            tap(x => this._router.navigateByUrl("/home")),
            catchError((error: HttpErrorResponse) => of(AuthAction.doLoginFailure(error))))
      )));

  doRegister$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.DO_REGISTER),
      mergeMap((action: { username: string, password: string }) =>
        this.userService.register(action)
          .pipe(
            map((user: User) => AuthAction.doRegisterSuccess({user})),
            tap(x => this._router.navigateByUrl("/home")),
            catchError((error: any) => of(AuthAction.doLoginFailure(error))))
      )));

  doLogout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.DO_LOGOUT),
      tap(() => {
        this._router.navigateByUrl("/login");
      })
    ), {dispatch: false})

  failedLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthAction.DO_LOGIN_FAILURE),
      map((error: HttpErrorResponse) => showNotification({
        title: 'неуспешна најава',
        text: error.error.message,
        color: 'danger'
      }))
    ))

  constructor(
    private actions$: Actions,
    private userService: UserService,
    private _router: Router
  ) {}
}
