import {Component, OnInit} from '@angular/core';
import {ReceiptService} from "../../../service/receipt/receipt.service";
import {Store} from "@ngrx/store";
import {getRecipes} from "../../../state-managment/receipt/receipt-actions";
import {Observable} from "rxjs";
import {State} from "../../../state-managment/receipt/receipt-reducer";
import {BuildReceipt} from "../../../model/response/BuildReceipt";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recipes$: Observable<BuildReceipt[]> = this.store.select(x => x.receipt.recipes);

  constructor(private receiptService: ReceiptService, private store: Store<{ receipt: State }>) {
  }

  ngOnInit(): void {
    this.store.dispatch(getRecipes());
    this.store.subscribe(x => console.log(x));
  }
}
