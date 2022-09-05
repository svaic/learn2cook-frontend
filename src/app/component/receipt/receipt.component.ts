import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Receipt} from "../../model/Receipt";
import {mapDifficulty, parseDuration, ReceiptDifficultyData} from "../../utility/utility";
import * as moment from "moment";

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnChanges {

  @Input() receipt!: Receipt;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(moment.duration(this.receipt.timeToPrepare).asMinutes());
  }

  getDuration(duration: string) {
    return parseDuration(duration);
  }

  getPicture(): ReceiptDifficultyData {
    return mapDifficulty[this.receipt.difficulty];
  }
}
