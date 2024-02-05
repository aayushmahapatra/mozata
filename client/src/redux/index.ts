import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./order/order.reducers";
import dishReducer from "./dish/dish.reducers";

export const store = configureStore({
  reducer: {
    order: orderReducer,
    dish: dishReducer,
  },
});
