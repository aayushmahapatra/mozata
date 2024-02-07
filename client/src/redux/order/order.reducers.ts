import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IMenuItem, IOrderState } from "./order.interfaces";

const initialState: IOrderState = {
  orders: [],
  total: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addItemToOrder: (
      state,
      action: PayloadAction<{
        restaurantId: string;
        restaurantName: string;
        item: IMenuItem;
      }>
    ) => {
      const { restaurantId, restaurantName, item } = action.payload;
      const currentOrder = state.orders.find(
        (order) => order.restaurantId === restaurantId
      );

      if (currentOrder) {
        const existingItem = currentOrder.items.find((i) => i.id === item.id);

        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          currentOrder.items.push(item);
        }
      } else {
        state.orders.push({
          restaurantId,
          restaurantName,
          items: [item],
        });
      }

      state.total += item.price * item.quantity;
    },
    removeItemFromOrder: (
      state,
      action: PayloadAction<{ restaurantId: string; itemId: string }>
    ) => {
      const { restaurantId, itemId } = action.payload;
      const currentOrder = state.orders.find(
        (order) => order.restaurantId === restaurantId
      );

      if (currentOrder) {
        const selectedItem = currentOrder.items.find(
          (item) => item.id === itemId
        );

        if (selectedItem) {
          selectedItem.quantity -= 1;

          state.total -= selectedItem.price;

          // remove the item if quantity becomes zero
          if (selectedItem.quantity === 0) {
            currentOrder.items = currentOrder.items.filter(
              (item) => item.id !== itemId
            );
          }

          // remove the order if there are no items left
          if (currentOrder.items.length === 0) {
            state.orders = state.orders.filter(
              (order) => order.restaurantId !== restaurantId
            );
          }
        }
      }
    },
    clearOrder: (state) => {
      state.orders = [];
      state.total = 0;
    },
  },
  extraReducers: (_builder) => {},
});

export const { addItemToOrder, removeItemFromOrder, clearOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
