import * as AuthActions from "./auth-actions";
import {on} from "@ngrx/store";
import {createRehydrateReducer} from "ngrx-rehydrate";
import {User} from "../../model/user/user";
import {DO_LOGOUT} from "./auth-actions";

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
  on(AuthActions.updateUserData, (state, user) => ({currUser: user})),
  on(AuthActions.doLogout, () => (initialState)),
  on(AuthActions.doRegisterSuccess, (state, user) => ({currUser: user})),
)

export function logout(reducer: any) {
  return function (state: any, action: any) {
    return reducer(action.type === DO_LOGOUT ? undefined : state, action);
  }
}
