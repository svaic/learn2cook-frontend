import {createAction, props} from "@ngrx/store";

export const CHANGE_VALIDATE_STATE = '[STEP] Change validate step';

export const IS_UPLOAD_IMAGE = '[STEP] Upload image step';

export const UPLOAD_IMAGE_FINISHED = '[STEP] uploading image finished';

export const UPLOAD_IMAGE_ERROR = '[STEP] image error';

export const SET_STEPS = '[STEP] Set steps';

export const NEXT_STEP = '[STEP] next step';

export const PREVIOUS_STEP = '[STEP] previous step';


export const setSteps = createAction(
  SET_STEPS,
  props<any>()
)

export const nextStep = createAction(
  NEXT_STEP,
  (payload: any = {}) => payload
)

export const previousStep = createAction(
  PREVIOUS_STEP,
  (payload: any = {}) => payload
)

export const changeValidateState = createAction(
  CHANGE_VALIDATE_STATE,
  props<any>()
);

export const isUploadingImage = createAction(
  IS_UPLOAD_IMAGE,
  props<any>()
);

export const uploadPictureFinished = createAction(
  UPLOAD_IMAGE_FINISHED,
  props<any>()
);

export const uploadPictureError = createAction(
  UPLOAD_IMAGE_ERROR,
  props<any>()
);
