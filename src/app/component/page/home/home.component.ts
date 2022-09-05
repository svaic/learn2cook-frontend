import {Component, OnInit} from '@angular/core';
import {ReceiptService} from "../../../service/receipt/receipt.service";
import {Receipt} from "../../../model/Receipt";
import {Store} from "@ngrx/store";
import {GET_RECIPES, getRecipes} from "../../../reducers/rceipt-actions";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public recipes: Array<Receipt> | undefined;
  constructor(private receiptService: ReceiptService, private store: Store) { }

  ngOnInit(): void {
    this.store.select(state => state).subscribe(x=> console.log(x));
    this.receiptService.getRecipes()
      .subscribe(x => {
        this.recipes = Array(10).fill(x.recipes[0]);
      });
  }

  click() {
    this.store.dispatch(getRecipes());
  }
}
