import { ITraining } from "../training/training";

export interface ICard {
  datas: ITraining;
  dark?: boolean;
  showDesc?: boolean;
  showButtonSub?: boolean;
}
