import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../service/user/user.service";
import {LoginRequest} from "../../../model/LoginRequest";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {doLogin} from "../../../reducers/login-actions";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string = "";
  public password: string = "";

  constructor(private userService: UserService, private _router: Router, private store: Store<{auth: any}>) { }

  ngOnInit(): void {
  }

  submitButtonClicked() {
    let loginRequest: LoginRequest = {
      username: this.username,
      password: this.password
    }
    this.store.dispatch(doLogin(loginRequest));
    this.store.select("auth").subscribe(x=>{
      if (x) {
        this._router.navigateByUrl("/home")
      }
    });
  }

}
