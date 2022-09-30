import {Settings} from "./settings";
import {Ingredient} from "../Ingredient";

export interface User {
  username: string;
  type: string;
  items: Array<Ingredient>;
  points: number;
  settings: Settings;
  hasArchivedCertificate: boolean
}
