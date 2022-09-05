import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {doRegister} from "../../../reducers/login-actions";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string = "";
  password: string = "";
  confirmPassword: string = "";

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  submitButtonClicked() {
    if (this.password === this.confirmPassword) {
      let request = {username: this.username, password: this.password}
      this.store.dispatch(doRegister(request));
    }
  }

}
