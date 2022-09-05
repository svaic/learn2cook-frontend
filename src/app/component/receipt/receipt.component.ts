import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Receipt} from "../../model/Receipt";
import {mapDifficulty, ReceiptDifficultyData} from "../../utility/utility";

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnChanges {

  @Input() receipt!: Receipt;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  getPicture(): ReceiptDifficultyData {
    return mapDifficulty[this.receipt.difficulty];
  }
}
