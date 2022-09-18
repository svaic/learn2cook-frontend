import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {NotificationState} from "../../state-managment/notification/notification-reducer";
import {Observable} from "rxjs";
import {clearNotification} from "../../state-managment/notification/notification-actions";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  showNotification$: Observable<NotificationState>

  constructor(private store: Store<{notification: NotificationState}>) {
    this.showNotification$ = store.select(x=>x.notification);
    this.showNotification$.subscribe(x => setTimeout(() => {
      this.store.dispatch(clearNotification());
    }, 10000))
  }

  close() {
    this.store.dispatch(clearNotification());
  }
}
