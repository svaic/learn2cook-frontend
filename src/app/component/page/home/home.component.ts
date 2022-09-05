import {Component, OnInit} from '@angular/core';
import {ReceiptService} from "../../../service/receipt/receipt.service";
import {Receipt} from "../../../model/Receipt";
import {Store} from "@ngrx/store";
import {GET_RECIPES, getRecipes} from "../../../reducers/receipt-actions";
import {map, Observable} from "rxjs";
import {State} from "../../../reducers/receipt-reducer";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recipes$: Observable<Receipt[]> = this.store.select(x=>x.receipt.recipes);
  constructor(private receiptService: ReceiptService, private store: Store<{receipt: State}>) { }

  ngOnInit(): void {
    this.store.dispatch(getRecipes());
  }
}
