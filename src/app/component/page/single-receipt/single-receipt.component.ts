import {Component, OnInit} from '@angular/core';
import {Step} from "../../../model/Step";
import {ReceiptService} from "../../../service/receipt/receipt.service";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {mapDifficulty, parseDuration, ReceiptDifficultyData} from "../../../utility/utility";
import {Observable, switchMap} from "rxjs";
import {ReceiptDifficulty} from "../../../model/enumerable/ReceiptDifficulty";
import {BuildReceipt} from "../../../model/response/BuildReceipt";
import {User} from "../../../model/user/user";
import {Ingredient} from "../../../model/Ingredient";

@Component({
  selector: 'app-cook-receipt',
  templateUrl: './single-receipt.component.html',
  styleUrls: ['./single-receipt.component.css']
})
export class SingleReceipt implements OnInit {

  receipt$: Observable<BuildReceipt>;
  currentStep: Step | undefined;
  steps: Step[] | undefined;
  user: User | undefined;

  constructor(private receiptService: ReceiptService, private route: ActivatedRoute, private readonly store: Store) {

    this.receipt$ = this.route.params.pipe(switchMap(params => {
      return receiptService.getReceipt(params['id'] as number)
    }));

    this.store.select((state: any) => state.auth.currUser).subscribe(x => this.user = x);
  }

  startReceipt() {
    this.receipt$.subscribe(receipt => {
      this.currentStep = receipt.receipt.steps[0];
      this.steps = receipt.receipt.steps;
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

  containsIngredient(ingredient: Ingredient) {
    if (this.user) {
      if (this.user.fridgeItems.find(x => x.ingredient.id === ingredient.id)) return true;
      if (this.user.fridgeItems.find(x => x.ingredient.id === ingredient.id)) return true;
      return false;
    }
    return false;
  }

  /*
    getIngredients() {
      if (this.currentStep) {
        return this.currentStep.ingredientsUsed;
      }*/

  //}

  ngOnInit(): void {
  }

}
