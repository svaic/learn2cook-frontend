import {Injectable} from '@angular/core';
import {RecipesResponse} from "../../model/response/RecipesResponse";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map, Observable} from "rxjs";
import {BuildReceipt} from "../../model/response/BuildReceipt";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(private http: HttpClient, private store: Store<{ receipt: any }>) {
  }

  public getRecipes(): Observable<RecipesResponse> {
    return this.http.post<Array<BuildReceipt>>(environment.apiURL + "recipes", {username: "test", password: "test"})
      .pipe(map((x: Array<BuildReceipt>) => {
        return {recipes: x} as RecipesResponse
      }))
  }

  public getReceipt(id: number): Observable<BuildReceipt> {
    return this.store.pipe(map(x => x.receipt.recipes[id]));
  }
}
