import { Component, OnInit } from '@angular/core';
import {Observable, tap} from "rxjs";
import {User} from "../../model/user/user";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-floating-icons',
  templateUrl: './floating-icons.component.html',
  styleUrls: ['./floating-icons.component.css']
})
export class FloatingIconsComponent implements OnInit {

  currUser$: Observable<User> = this.store.select(x=>x.auth.currUser);
  public showFridgePanel: boolean = false;
  public showKitchenPanel: boolean = false;

  constructor(private store: Store<{auth: any}>) { }

  ngOnInit(): void {
  }

  fridgeClicked() {
    this.showFridgePanel = !this.showFridgePanel;
  }

  kitchenClicked() {
    this.showKitchenPanel = !this.showKitchenPanel;
  }

}
