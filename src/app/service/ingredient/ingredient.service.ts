import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map, Observable} from "rxjs";
import {IngredientCard} from "../../state-managment/ingredients/ingredients-reducer";
import {ChangeUserIngredientRequest} from "../../model/response/ChangeUserIngredientRequest";
import {Ingredient} from "../../model/Ingredient";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) {
  }

  getAllIngredients(filterArr: Ingredient[] = []): Observable<Array<Ingredient>> {
    return this.http.get<Array<Ingredient>>(environment.apiURL + 'ingredients')
      .pipe(
        map(AllElem => AllElem.filter(elem => !filterArr.find(filterElem => filterElem.id === elem.id)))
      );
  }

  changeIngredientStateValue(card: IngredientCard) {
    const body: ChangeUserIngredientRequest = {ingredient: card.ingredient, addIngredient: !card.inCard};
    return this.http.post(environment.apiURL + 'changeIngredients', body);
  }
}
