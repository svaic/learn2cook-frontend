import {IngredientWithSize} from "../IngredientWithSize";
import {Settings} from "./settings";

export interface User {
  username: string;
  type: string;
  fridgeItems: Array<IngredientWithSize>;
  kitchenItems: Array<IngredientWithSize>;
  points: number;
  settings: Settings;
  hasArchivedCertificate: boolean
}
