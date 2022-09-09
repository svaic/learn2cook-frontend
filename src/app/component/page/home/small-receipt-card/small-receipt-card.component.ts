import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {mapDifficulty, parseDuration, ReceiptDifficultyData} from "../../../../utility/utility";
import {BuildReceipt} from "../../../../model/response/BuildReceipt";

@Component({
  selector: 'app-receipt',
  templateUrl: './small-receipt-card.component.html',
  styleUrls: ['./small-receipt-card.component.css']
})
export class SmallReceiptCardComponent implements OnChanges {

  @Input() receipt!: BuildReceipt;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  getDuration(duration: string) {
    return parseDuration(duration);
  }

  getPicture(): ReceiptDifficultyData {
    return mapDifficulty[this.receipt.receipt.difficulty];
  }
}
