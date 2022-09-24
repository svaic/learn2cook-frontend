import * as AuthActions from "./auth-actions";
import {DO_LOGOUT} from "./auth-actions";
import {on} from "@ngrx/store";
import {createRehydrateReducer} from "ngrx-rehydrate";
import {User} from "../../model/user/user";

export interface AuthState {
  currUser: User,
  jwtToken: string
}

export const initialState = {
  currUser: undefined,
  jwtToken: undefined
}


export const authReducer = createRehydrateReducer(
  {key: 'UserKey'},
  initialState,
  on(AuthActions.doLoginSuccess, (state, props) => ({...state, currUser: props.user})),
  on(AuthActions.updateUserData, (state, user) => ({...state, currUser: user})),
  on(AuthActions.doLogout, () => (initialState)),
  on(AuthActions.doRegisterSuccess, (state, props) => ({...state, currUser: props.user})),
  on(AuthActions.updateJwtToken, (state, props) => ({...state, jwtToken: props.jwtToken}))
)

export const logout = (reducer: any) =>
  (state: any, action: any) => {
    return reducer(action.type === DO_LOGOUT ? undefined : state, action);
  }
