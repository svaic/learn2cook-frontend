import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Receipt} from "../../model/Receipt";

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnChanges {

  @Input() receipt!: Receipt;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.receipt);
  }
}
