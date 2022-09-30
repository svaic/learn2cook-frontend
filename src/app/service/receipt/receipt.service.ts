import {Injectable} from '@angular/core';
import {RecipesResponse} from "../../model/response/RecipesResponse";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map, Observable} from "rxjs";
import {BuildReceipt} from "../../model/response/BuildReceipt";
import {Store} from "@ngrx/store";
import {Receipt} from "../../model/Receipt";
import {toBuildReceipt} from "../../utility/utility";
import {IngredientCard} from "../../state-managment/ingredients/ingredients-reducer";

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {

  constructor(private http: HttpClient, private store: Store<{ receipt: any}>) {
  }

  public getRecipes(ingredients: IngredientCard[]): Observable<RecipesResponse> {
    console.log(ingredients);
    return this.http.post<Array<Receipt>>(environment.apiURL + "recipes", {}).pipe(
      map((x: Array<Receipt>) => {
      return {recipes: x.map(x=>toBuildReceipt(x, ingredients))} as RecipesResponse
    }))
  }

  public getReceipt(id: number): Observable<BuildReceipt> {
    return this.store.select(x => x.receipt.recipes[id-1]);
  }
}
