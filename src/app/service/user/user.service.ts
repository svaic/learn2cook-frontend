import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginRequest} from "../../model/LoginRequest";
import {environment} from "../../../environments/environment";
import {User} from "../../model/user/user";
import {Observable} from "rxjs";
import {AuthState} from "../../state-managment/auth/auth-reducer";
import {Store} from "@ngrx/store";
import {doLogout} from "../../state-managment/auth/auth-actions";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private store: Store<{ auth: AuthState }>) {
  }

  login(request: LoginRequest) {
    return this.http.post<User>(environment.apiURL + "login", request)
  }

  register(request: LoginRequest) {
    return this.http.post<User>(environment.apiURL + "register", request)
  }

  refreshToken(): Observable<any> {
    const options = {
      headers: new HttpHeaders({"isRefreshToken": "true"})
    }

    return this.http.get(environment.apiURL + "refreshtoken", options);
  }

  logout() {
    this.store.dispatch(doLogout());
  }
}

