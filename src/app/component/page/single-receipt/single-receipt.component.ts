import {Component, OnInit} from '@angular/core';
import {Step} from "../../../model/Step";
import {ReceiptService} from "../../../service/receipt/receipt.service";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {mapDifficulty, parseDuration, ReceiptDifficultyData} from "../../../utility/utility";
import {catchError, map, Observable, switchMap, tap} from "rxjs";
import {ReceiptDifficulty} from "../../../model/enumerable/ReceiptDifficulty";
import {BuildReceipt} from "../../../model/response/BuildReceipt";
import {User} from "../../../model/user/user";
import {Ingredient} from "../../../model/Ingredient";
import {
  changeValidateState,
  isUploadingImage,
  nextStep,
  previousStep,
  setSteps, uploadPictureError, uploadPictureFinished
} from "../../../state-managment/step/step-actions";
import {StepState} from "../../../state-managment/step/step-reducer";
import {ImageSendService} from "../../../service/images/image-send.service";
import {updateUserData} from "../../../state-managment/auth/auth-actions";

@Component({
  selector: 'app-cook-receipt',
  templateUrl: './single-receipt.component.html',
  styleUrls: ['./single-receipt.component.css']
})
export class SingleReceipt implements OnInit {

  receipt$: Observable<BuildReceipt>;
  stepState$ : Observable<StepState>;
  user: User | undefined;

  constructor(private receiptService: ReceiptService, private route: ActivatedRoute, private readonly store: Store, private imageSendService: ImageSendService) {

    this.receipt$ = this.route.params.pipe(switchMap(params => {
      return receiptService.getReceipt(params['id'] as number)
    }),tap(x=>this.store.dispatch(setSteps(x.receipt.steps))));

    this.stepState$ = this.store.select((x:any)=>x.steps)

    this.store.select((state: any) => state.auth.currUser).subscribe(x => this.user = x);
  }

  startReceipt() {
    this.store.dispatch(nextStep());
  }

  getCurrentStep(state: StepState) {
    return state.steps[state.currentStep-1];
  }

  nextStep() {
    this.store.dispatch(nextStep());
  }

  previousStep() {
    this.store.dispatch(previousStep());
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
      if (this.user.kitchenItems.find(x => x.ingredient.id === ingredient.id)) return true;
      return false;
    }
    return false;
  }

  showUploadPicture() {
    this.store.dispatch(changeValidateState(true));
  }

  onFileUpload(event:any) {
    const f: File = event.target.files[0];
    this.store.dispatch(isUploadingImage(true));
    this.imageSendService.sendFile("test",1, f).pipe(
      catchError(
      (x: any) => {
        this.store.dispatch(uploadPictureError({text: x.error.error}));
        return ([]);
      }
    )).subscribe(x=> {
      this.store.dispatch(uploadPictureFinished(true));
      this.store.dispatch(updateUserData(x));
    });
  }

  ngOnInit(): void {
    this.store.subscribe(x=>console.log(x));
  }

}
