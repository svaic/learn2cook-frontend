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
import * as StepAction from "../../../state-managment/step/step-actions";
import {StepState} from "../../../state-managment/step/step-reducer";
import {ImageSendService} from "../../../service/images/image-send.service";
import {updateUserData} from "../../../state-managment/auth/auth-actions";
import {IngredientType} from "../../../model/enumerable/IngredientType";
import {showNotification} from "../../../state-managment/notification/notification-actions";
import {IngredientCard, IngredientState} from "../../../state-managment/ingredients/ingredients-reducer";

@Component({
  selector: 'app-cook-receipt',
  templateUrl: './single-receipt.component.html',
  styleUrls: ['./single-receipt.component.css']
})
export class SingleReceipt implements OnInit {

  receipt$: Observable<BuildReceipt>;
  stepState$: Observable<StepState>;
  user: User | undefined;
  fridge: IngredientCard[] = [];
  fetchedSteps: boolean = false;

  constructor(private receiptService: ReceiptService, private route: ActivatedRoute, private readonly store: Store<{ingredient: IngredientState}>, private imageSendService: ImageSendService) {

    this.store.select((state: any) => state.auth.currUser).subscribe(x => this.user = x);

    this.receipt$ = this.route.params.pipe(switchMap(params =>
      receiptService.getReceipt(params['id'] as number)
    ));

    this.receipt$.subscribe(receipt => {
      if (!this.fetchedSteps) {
        this.store.dispatch(StepAction.setSteps(receipt.receipt.steps));
        this.fetchedSteps = true;
      }
    });

    this.stepState$ = this.store.select((x: any) => x.steps)

    this.store.select(x=>x.ingredient).subscribe(x=> this.fridge = x.cards)
  }

  startReceipt() {
    this.store.dispatch(StepAction.nextStep());
  }

  getCurrentStep(state: StepState) {
    return state.steps[state.currentStep - 1];
  }

  nextStep() {
    this.store.dispatch(StepAction.nextStep());
  }

  previousStep() {
    this.store.dispatch(StepAction.previousStep());
  }

  getDifficulty(difficulty: ReceiptDifficulty): ReceiptDifficultyData {
    return mapDifficulty[difficulty];
  }

  getDuration(duration: string) {
    return parseDuration(duration);
  }

  containsIngredient(ingredient: Ingredient) {
    if (this.fridge) {
      if (ingredient.type == IngredientType.FRIDGE) {
        const userIngredient = this.fridge.find(x => x.ingredientWithSize.ingredient.id === ingredient.id);
        if (userIngredient && userIngredient.inCard) return true;
      }
      if (ingredient.type == IngredientType.KITCHEN && this.user!.kitchenItems.find(x => x.ingredient.id === ingredient.id)) return true;
    }
    return false;
  }

  showUploadPicture() {
    this.store.dispatch(StepAction.changeValidateState(true));
  }

  onFileUpload(event: any) {
    const file: File = event.target.files[0];

    this.store.dispatch(StepAction.isUploadingImage(true));

    const id = this.route.snapshot.paramMap.get("id");

    if (this.user && id) {
      this.imageSendService.sendFile(this.user?.username, id, file)
        .pipe(
          catchError(
            (x: any) => {
              this.store.dispatch(StepAction.uploadPictureError({text: x.error.error}));
              this.store.dispatch(showNotification({
                title: 'Error uploading picture',
                text: x.error.message,
                color: 'danger'
              }))
              return ([]);
            }
          ))
        .subscribe((user: User) => {
          this.store.dispatch(StepAction.uploadPictureFinished(true));
          this.store.dispatch(showNotification({
            title: 'successfully uploaded picture',
            text: getPointsNotificationText(user.points),
            color: 'success'
          }))
          this.store.dispatch(updateUserData(user));
        });
    }
  }

  ngOnInit(): void {
  }

}
