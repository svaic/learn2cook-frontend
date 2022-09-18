import {Component, OnInit} from '@angular/core';
import {ReceiptService} from "../../../service/receipt/receipt.service";
import {ActivatedRoute} from "@angular/router";
import {Store} from "@ngrx/store";
import {getPointsNotificationText, mapDifficulty, parseDuration, ReceiptDifficultyData} from "../../../utility/utility";
import {catchError, Observable, switchMap} from "rxjs";
import {ReceiptDifficulty} from "../../../model/enumerable/ReceiptDifficulty";
import {BuildReceipt} from "../../../model/response/BuildReceipt";
import {User} from "../../../model/user/user";
import {Ingredient} from "../../../model/Ingredient";
import {
  changeValidateState,
  isUploadingImage,
  nextStep,
  previousStep,
  setSteps,
  uploadPictureError,
  uploadPictureFinished
} from "../../../state-managment/step/step-actions";
import {StepState} from "../../../state-managment/step/step-reducer";
import {ImageSendService} from "../../../service/images/image-send.service";
import {updateUserData} from "../../../state-managment/auth/auth-actions";
import {IngredientType} from "../../../model/enumerable/IngredientType";
import {showNotification} from "../../../state-managment/notification/notification-actions";

@Component({
  selector: 'app-cook-receipt',
  templateUrl: './single-receipt.component.html',
  styleUrls: ['./single-receipt.component.css']
})
export class SingleReceipt implements OnInit {

  receipt$: Observable<BuildReceipt>;
  stepState$: Observable<StepState>;
  user: User | undefined;
  fetchedSteps: boolean = false;

  constructor(private receiptService: ReceiptService, private route: ActivatedRoute, private readonly store: Store, private imageSendService: ImageSendService) {

    this.store.select((state: any) => state.auth.currUser).subscribe(x => this.user = x);

    this.receipt$ = this.route.params.pipe(switchMap(params =>
      receiptService.getReceipt(params['id'] as number)
    ));

    this.receipt$.subscribe(receipt => {
      if (!this.fetchedSteps) {
        this.store.dispatch(setSteps(receipt.receipt.steps));
        this.fetchedSteps = true;
      }
    });

    this.stepState$ = this.store.select((x: any) => x.steps)
  }

  startReceipt() {
    this.store.dispatch(nextStep());
  }

  getCurrentStep(state: StepState) {
    return state.steps[state.currentStep - 1];
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
      if (ingredient.type == IngredientType.FRIDGE && this.user.fridgeItems.find(x => x.ingredient.id === ingredient.id)) return true;
      if (ingredient.type == IngredientType.KITCHEN && this.user.kitchenItems.find(x => x.ingredient.id === ingredient.id)) return true;
      return false;
    }
    return false;
  }

  showUploadPicture() {
    this.store.dispatch(changeValidateState(true));
  }

  onFileUpload(event: any) {
    const file: File = event.target.files[0];

    this.store.dispatch(isUploadingImage(true));

    const id = this.route.snapshot.paramMap.get("id");

    if (this.user && id) {
      this.imageSendService.sendFile(this.user?.username, id, file)
        .pipe(
          catchError(
            (x: any) => {
              this.store.dispatch(uploadPictureError({text: x.error.error}));
              this.store.dispatch(showNotification({title: 'Error uploading picture', text: x.error.error, color: 'danger'}))
              return ([]);
            }
          ))
        .subscribe((user: User) => {
          this.store.dispatch(uploadPictureFinished(true));
          this.store.dispatch(showNotification({title: 'successfully uploaded picture', text: getPointsNotificationText(user.points), color: 'success'}))
          this.store.dispatch(updateUserData(user));
        });
    }
  }

  ngOnInit(): void {
  }

}
