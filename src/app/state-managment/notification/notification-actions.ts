import {createAction, props} from "@ngrx/store";

export const showNotification = createAction(
  "[NOTIFICATION] show notification",
  props<any>()
)

export const clearNotification = createAction(
  "[NOTIFICATION] clear notification",
)
