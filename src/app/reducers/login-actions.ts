import {createAction, props} from "@ngrx/store";
import {User} from "../model/user/user";

export const DO_LOGIN = "[Auth] login";

export const DO_LOGIN_SUCCESS = "[Auth] login success";

export const DO_LOGOUT = "[Auth] logout";

export const DO_REGISTER = "[Auth] register";

export const DO_REGISTER_SUCCESS = "[Auth] register success";

export const doLogin = createAction(
  DO_LOGIN,
  props<{username: string, password: string}>()
)

export const doLoginSuccess = createAction(
  DO_LOGIN_SUCCESS,
  props<any>()
)

export const doLogout = createAction(
  DO_LOGOUT,
  (payload: any = {}) => payload
)

export const doRegister = createAction(
  DO_REGISTER,
  props<{username: string, password: string}>()
)

export const doRegisterSuccess = createAction(
  DO_REGISTER_SUCCESS,
  props<any>()
)
