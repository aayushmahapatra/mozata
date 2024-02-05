import { IDishState } from "./dish/dish.interfaces";
import { IOrderState } from "./order/order.interfaces";

export interface IRootState {
  order: IOrderState;
  dish: IDishState;
}
