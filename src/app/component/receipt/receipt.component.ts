import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Receipt} from "../../model/Receipt";
import {mapDifficulty, parseDuration, ReceiptDifficultyData} from "../../utility/utility";

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

  getDuration(duration: string) {
    return parseDuration(duration);
  }

  getPicture(): ReceiptDifficultyData {
    return mapDifficulty[this.receipt.difficulty];
  }
}
