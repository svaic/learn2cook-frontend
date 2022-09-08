import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {doLogout} from "../../reducers/auth-actions";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userState$ = this.store.select("auth");

  constructor(private store: Store<{auth: any}>,  private _router: Router) { }

  ngOnInit(): void {
    this.redirectToLogin();
  }

  logout() {
    this.store.dispatch(doLogout());
  }

  redirectToLogin() {
    this.userState$.subscribe(userState => {
      if (!userState.currUser) {
        this._router.navigateByUrl("/login");
      }
    })
  }

}
