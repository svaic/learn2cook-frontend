import {Component, OnInit} from '@angular/core';
import {ReceiptService} from "../../../service/receipt/receipt.service";
import {Store} from "@ngrx/store";
import {getRecipes, setReceiptType} from "../../../state-managment/receipt/receipt-actions";
import {map, Observable} from "rxjs";
import {State} from "../../../state-managment/receipt/receipt-reducer";
import {BuildReceipt} from "../../../model/response/BuildReceipt";
import {ReceiptType} from "../../../model/enumerable/ReceiptType";
import {getTimeToEat} from "../../../utility/utility";
import {User} from "../../../model/user/user";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  recipes$: Observable<BuildReceipt[]>;

  user?: User;

  receiptTypeFilter?: ReceiptType;

  constructor(private receiptService: ReceiptService, private store: Store<{ receipt: State, auth: any }>) {
    this.recipes$ = this.store.select(x => x.receipt).pipe(
      map(x => x.filter ? x.recipes.filter(y => y.receipt.type === x.filter) : x.recipes));

    this.store.select(x=>x.auth.currUser).subscribe(x=>{this.user = x});
  }

  ngOnInit(): void {
    this.store.dispatch(getRecipes());
    this.receiptTypeFilter = getTimeToEat(this.user!);
  }

  filterChanged() {
    if (this.receiptTypeFilter == 'ALL') {
      this.store.dispatch(setReceiptType({filter: undefined}));
    }
    else this.store.dispatch(setReceiptType({filter: this.receiptTypeFilter}));
  }
}
