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
        // If order for the restaurant already exists, update it
        const existingItem = currentOrder.items.find((i) => i.id === item.id);

        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          currentOrder.items.push(item);
        }
      } else {
        // If no order for the restaurant exists, create a new order
        state.orders.push({
          restaurantId,
          restaurantName,
          items: [item],
        });
      }

      // Update total price
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
          // Reduce the quantity by 1
          selectedItem.quantity -= 1;

          // Update total price
          state.total -= selectedItem.price;

          // Remove the item if quantity becomes zero
          if (selectedItem.quantity === 0) {
            currentOrder.items = currentOrder.items.filter(
              (item) => item.id !== itemId
            );
          }

          // Remove the order if there are no items left
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
