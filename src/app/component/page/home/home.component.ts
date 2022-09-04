import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReceiptService} from "../../../service/receipt/receipt.service";
import {Receipt} from "../../../model/Receipt";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public recipes: Array<Receipt> | undefined;
  constructor(private receiptService: ReceiptService) { }

  ngOnInit(): void {
    this.receiptService.getRecipes()
      .subscribe(x => {
        this.recipes = Array(10).fill(x.recipes[0]);
        console.log(this.recipes);
      });
  }
}
