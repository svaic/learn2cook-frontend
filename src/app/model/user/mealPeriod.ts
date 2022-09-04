import {Time} from "@angular/common";

export interface MealPeriod {
  fromTime: Time;
  toTime: Time;
  salad: boolean;
  desert: boolean;
}
