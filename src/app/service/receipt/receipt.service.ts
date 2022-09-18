import {Injectable} from '@angular/core';
import {RecipesResponse} from "../../model/response/RecipesResponse";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map, Observable} from "rxjs";
import {BuildReceipt} from "../../model/response/BuildReceipt";
import {Store} from "@ngrx/store";
import {User} from "../../model/user/user";

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  user?: User;

  constructor(private http: HttpClient, private store: Store<{ receipt: any, auth: any }>) {
    this.store.select(x => x.auth.currUser).subscribe(x => this.user = x);
  }

  public getRecipes(): Observable<RecipesResponse> {
    return this.http.post<Array<BuildReceipt>>(environment.apiURL + "recipes", {
      username: this.user?.username,
      password: this.user?.password,
    }).pipe(
      map((x: Array<BuildReceipt>) => {
      return {recipes: x} as RecipesResponse
    }))
  }

  public getReceipt(id: number): Observable<BuildReceipt> {
    return this.store.select(x => x.receipt.recipes[id]);
  }
}
