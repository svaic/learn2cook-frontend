import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IngredientWithSize} from "../../model/IngredientWithSize";
import {environment} from "../../../environments/environment";
import {map, Observable} from "rxjs";
import {Ingredient} from "../../model/Ingredient";
import {toIngredientWithSize} from "../../utility/utility";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) {
  }

  getAllIngredients(filterArr: Ingredient[] = []): Observable<Array<Ingredient>> {
    return this.http.get<Array<IngredientWithSize>>(environment.apiURL + 'ingredients')
      .pipe(
        map(x => x.map(y => y.ingredient)),
        map(AllElem => AllElem.filter(elem => !filterArr.find(filterElem => filterElem.id === elem.id))),
      );
  }

  changeIngredientStateValue(ingredient: Ingredient, username: string) {
    return this.http.post(environment.apiURL + username, toIngredientWithSize(ingredient));
  }
}
