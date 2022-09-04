import { Injectable } from '@angular/core';
import {RecipesResponse} from "../../model/response/RecipesResponse";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Receipt} from "../../model/Receipt";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(private http: HttpClient) { }

  public getRecipes(): Observable<RecipesResponse> {
    return this.http.get<Array<Receipt>>(environment.apiURL + "recipes")
      .pipe(map((x: Array<Receipt>) => {
        return {recipes: x} as RecipesResponse
      }))
  }

  public getReceipt(id: number): Observable<Receipt> {
    return this.getRecipes().pipe(map(x => x.recipes[0]));
  }
}
