import {Injectable} from '@angular/core';
import {RecipesResponse} from "../../model/response/RecipesResponse";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map, Observable} from "rxjs";
import {BuildReceipt} from "../../model/response/BuildReceipt";
import {Store} from "@ngrx/store";
import {AuthState} from "../../state-managment/auth/auth-reducer";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(private http: HttpClient, private store: Store<{ receipt: any, auth: AuthState }>, private userService: UserService) {
  }

  public getRecipes(): Observable<RecipesResponse> {
    return this.http.post<Array<BuildReceipt>>(environment.apiURL + "recipes", {}).pipe(
      map((x: Array<BuildReceipt>) => {
      return {recipes: x} as RecipesResponse
    }))
  }

  public getReceipt(id: number): Observable<BuildReceipt> {
    return this.store.select(x => x.receipt.recipes[id]);
  }
}
