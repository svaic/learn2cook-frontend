import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {doLogout} from "../../state-managment/auth/auth-actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userState$ = this.store.select("auth");

  constructor(private store: Store<{ auth: any }>, private _router: Router) {
  }

  ngOnInit(): void {
    this.userState$.subscribe(userState => {
      if (!userState.currUser) {
        this._router.navigateByUrl("/login");
      }
    })
  }

  getRoute(): string {
    return this._router.url;
  }

  logout() {
    this.store.dispatch(doLogout());
  }

}
