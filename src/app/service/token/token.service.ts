import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {AuthState} from "../../state-managment/auth/auth-reducer";
import {updateJwtToken} from "../../state-managment/auth/auth-actions";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  jwtToken?: string;

  constructor(private store: Store<{ auth: AuthState }>) {
    store.select(x => x.auth.jwtToken).subscribe(x => this.jwtToken = x);
  }

  getToken() {
    return this.jwtToken;
  }

  setToken(jwtToken: string) {
    this.store.dispatch(updateJwtToken({jwtToken: jwtToken}));
  }
}
