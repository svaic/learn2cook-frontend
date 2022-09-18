import {createReducer, on} from "@ngrx/store";
import {clearNotification, showNotification} from "./notification-actions";

export interface NotificationState {
  title?: string,
  text?: string,
  color: string
}

export const initialState: NotificationState = {
  title: undefined,
  text: undefined,
  color: 'success'
}

export const NotificationReducer = createReducer(
  initialState,
  on(showNotification, (state, props) => ({title: props.title, text: props.text, color: props.color})),
  on(clearNotification, () => ({...initialState}))
)
