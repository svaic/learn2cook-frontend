import {Component, OnInit} from '@angular/core';
import {Step} from "../../../model/Step";
import {Receipt} from "../../../model/Receipt";
import {ReceiptService} from "../../../service/receipt/receipt.service";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {mapDifficulty, parseDuration, ReceiptDifficultyData} from "../../../utility/utility";
import {Observable, switchMap} from "rxjs";
import {ReceiptDifficulty} from "../../../model/enumerable/ReceiptDifficulty";

@Component({
  selector: 'app-cook-receipt',
  templateUrl: './cook-receipt.component.html',
  styleUrls: ['./cook-receipt.component.css']
})
export class CookReceiptComponent implements OnInit {

  receipt$: Observable<Receipt>;
  currentStep: Step | undefined;
  steps: Step[] | undefined;

  constructor(private receiptService: ReceiptService, private route: ActivatedRoute, private readonly store: Store) {

    this.receipt$ = this.route.params.pipe(switchMap(params => {
      return receiptService.getReceipt(params['id'] as number)
    }));
  }

  startReceipt() {
    this.receipt$.subscribe(receipt => {
      this.currentStep = receipt.steps[0];
      this.steps = receipt.steps;
    })
  }

  nextStep() {
    let nextStep = this.currentStep!.stepNumber + 1;
    this.currentStep = this.steps![nextStep - 1];
  }

  previousStep() {
    let prevStep = this.currentStep!.stepNumber - 1;
    this.currentStep = this.steps![prevStep - 1];
  }

  getDifficulty(difficulty: ReceiptDifficulty): ReceiptDifficultyData {
    return mapDifficulty[difficulty];
  }

  getDuration(duration: string) {
    return parseDuration(duration);
  }

  ngOnInit(): void {
  }

}
