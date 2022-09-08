import {User} from "../model/user/user";
import * as AuthActions from "./auth-actions";
import {on} from "@ngrx/store";
import {createRehydrateReducer} from "ngrx-rehydrate";

export interface AuthState {
  currUser: User
}

export const initialState = {
  currUser: undefined
}

export const authReducer = createRehydrateReducer(
  {key: 'UserKey'},
  initialState,
  on(AuthActions.doLoginSuccess, (state, user) => ({currUser: user})),
  on(AuthActions.doLogout, () => ({currUser: undefined})),
  on(AuthActions.doRegisterSuccess, (state, user) => ({currUser: user})),
)
