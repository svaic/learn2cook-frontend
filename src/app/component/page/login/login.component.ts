import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../service/user/user.service";
import {LoginRequest} from "../../../model/LoginRequest";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string = "";
  public password: string = "";

  constructor(private userService: UserService, private _router: Router) { }

  ngOnInit(): void {
  }

  submitButtonClicked() {
    let loginRequest: LoginRequest = {
      username: this.username,
      password: this.password
    }
    this.userService.login(loginRequest)
      .subscribe(x => this._router.navigateByUrl("/home"))
  }

}
