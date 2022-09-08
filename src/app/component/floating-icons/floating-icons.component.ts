import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Store} from "@ngrx/store";
import {
  changeIngredientStatus,
  getIngredients,
  getPipeForItems,
  IngredientCard,
  IngredientState
} from "../../reducers/ingredients-actions";
import {IngredientType} from "../../model/enumerable/IngredientType";
import {IngredientWithSize} from "../../model/IngredientWithSize";

@Component({
  selector: 'app-floating-icons',
  templateUrl: './floating-icons.component.html',
  styleUrls: ['./floating-icons.component.css']
})
export class FloatingIconsComponent implements OnInit {

  public showFridgePanel: boolean = false;
  public showKitchenPanel: boolean = false;
  public user: any;
  fridgeIngredients$: Observable<IngredientState> = of({} as IngredientState);
  kitchenIngredients$: Observable<IngredientState> = of({} as IngredientState)

  constructor(private store: Store<{ auth: any, ingredient: any }>) {

    this.store.select(store => store.auth.currUser).subscribe(user => {

        this.store.dispatch(
          getIngredients(
            {have: (user.kitchenItems.concat(user.fridgeItems)).map((x: IngredientWithSize) => x.ingredient)})
        );

        this.user = user;
      }
    );

    this.fridgeIngredients$ = getPipeForItems(this.store, IngredientType.FRIDGE);
    this.kitchenIngredients$ = getPipeForItems(this.store, IngredientType.KITCHEN);
  }

  ngOnInit(): void {
    this.store.subscribe(x => console.log(x));
  }

  fridgeClicked() {
    this.showFridgePanel = !this.showFridgePanel;
  }

  kitchenClicked() {
    this.showKitchenPanel = !this.showKitchenPanel;
  }

  checkBoxChanged(card: IngredientCard) {
    const user = this.user
    this.store.dispatch(changeIngredientStatus({card, currUser: user}));
  }
}
