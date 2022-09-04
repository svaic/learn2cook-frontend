import { Component, OnInit } from '@angular/core';
import {Step} from "../../../model/Step";
import {Receipt} from "../../../model/Receipt";
import {ReceiptService} from "../../../service/receipt/receipt.service";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-cook-receipt',
  templateUrl: './cook-receipt.component.html',
  styleUrls: ['./cook-receipt.component.css']
})
export class CookReceiptComponent implements OnInit {

  receipt!: Receipt;
  currentStep: Step | undefined;

  constructor(private receiptService: ReceiptService, private route: ActivatedRoute, private readonly store: Store) {

    this.route.params.subscribe(params => {
      receiptService.getReceipt(params['id'] as number)
        .subscribe(x => this.receipt = x);
    });
  }

  startReceipt() {
    this.currentStep = this.receipt.steps[0];
  }

  nextStep() {
    let nextStep = this.currentStep!.stepNumber + 1;
    this.currentStep = this.receipt.steps[nextStep-1];
  }

  previousStep() {
    let prevStep = this.currentStep!.stepNumber - 1;
    this.currentStep = this.receipt.steps[prevStep-1];
  }

  ngOnInit(): void {
  }

}
