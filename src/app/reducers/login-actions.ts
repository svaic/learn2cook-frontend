import {createAction, props} from "@ngrx/store";
import {User} from "../model/user/user";

export const DO_LOGIN = "[Auth] login";

export const DO_LOGIN_SUCCESS = "[Auth] login success";

export const DO_LOGOUT = "[Auth] logout";

export const doLogin = createAction(
  DO_LOGIN,
  props<{username: string, password: string}>()
)

export const doLoginSuccess = createAction(
  DO_LOGIN_SUCCESS,
  props<any>()
)

export const doLogout = createAction(
  DO_LOGOUT
)
