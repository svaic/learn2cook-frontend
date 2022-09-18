import * as AuthActions from "./auth-actions";
import {DO_LOGOUT} from "./auth-actions";
import {on} from "@ngrx/store";
import {createRehydrateReducer} from "ngrx-rehydrate";
import {User} from "../../model/user/user";

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

export const logout = (reducer: any) =>
  (state: any, action: any) => {
    return reducer(action.type === DO_LOGOUT ? undefined : state, action);
  }
