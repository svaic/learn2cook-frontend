import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IngredientWithSize} from "../../model/IngredientWithSize";
import {environment} from "../../../environments/environment";
import {map, Observable} from "rxjs";
import {IngredientCard} from "../../state-managment/ingredients/ingredients-reducer";
import {ChangeUserIngredientRequest} from "../../model/response/ChangeUserIngredientRequest";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) {
  }

  getAllIngredients(filterArr: IngredientWithSize[] = []): Observable<Array<IngredientWithSize>> {
    return this.http.get<Array<IngredientWithSize>>(environment.apiURL + 'ingredientsSize')
      .pipe(
        map(AllElem => AllElem.filter(elem => !filterArr.find(filterElem => filterElem.id === elem.id))),
      );
  }

  changeIngredientStateValue(card: IngredientCard, username: string) {
    const body: ChangeUserIngredientRequest = {ingredient: card.ingredientWithSize, addIngredient: !card.inCard};
    return this.http.post(environment.apiURL + 'changeIngredients/' + username, body);
  }
}
