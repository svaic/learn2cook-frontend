import {User} from "../model/user/user";
import * as AuthActions from "./login-actions";
import {createReducer, on} from "@ngrx/store";
import {state} from "@angular/animations";
import {reduce} from "rxjs";

export interface AuthState {
  currUser: User
}

export const initialState = {
  currUser: undefined
}

export const authReducer = createReducer(
  initialState,
  on(AuthActions.doLoginSuccess, (state, user) => ({currUser: user})),
  on(AuthActions.doLogout, () => ({currUser: undefined}))
)
