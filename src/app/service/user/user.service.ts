import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {LoginRequest} from "../../model/LoginRequest";
import {environment} from "../../../environments/environment";
import {User} from "../../model/user/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(request: LoginRequest) {
    this.http.post<User>(environment.apiURL + "login", request)
      .subscribe(x => console.log(x.fridgeItems),
        (err: HttpErrorResponse) => console.log(err.status));
  }
}
