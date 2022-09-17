import {Step} from "../../model/Step";
import {createReducer, on} from "@ngrx/store";
import * as StepActions from './step-actions';

export interface StepState {
  steps: Step[],
  currentStep: number,
  isValidateShown: boolean,
  isUploadingPicture: boolean,
  isUploadingPictureFinished: boolean,
  error?: string
}

export const initialState: StepState = {
  steps: [],
  currentStep: 0,
  isValidateShown: false,
  isUploadingPicture: false,
  isUploadingPictureFinished: false,
  error: undefined
}

export const StepReducer = createReducer(
  initialState,
  on(StepActions.setSteps, (state, newSteps: []) => ({...initialState, steps: newSteps})),
  on(StepActions.nextStep, (state) => ({...state, currentStep: state.currentStep +1})),
  on(StepActions.previousStep, (state) => ({...state, currentStep: state.currentStep -1})),
  on(StepActions.changeValidateState, (state, value) => ({...state, isValidateShown: value})),
  on(StepActions.isUploadingImage, (state, value) => ({...state, isUploadingPicture: value})),
  on(StepActions.uploadPictureFinished, (state, value) => ({...state, isUploadingPictureFinished: value, isValidateShown: false, isUploadingPicture: false, error: undefined})),
  on(StepActions.uploadPictureError, (state, error: { text: string }) => {
    return ({...state, error: error.text, isUploadingPicture:false, isUploadingPictureFinished: true})
  })
)
