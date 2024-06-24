import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    itemCount: 0,
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.card.info.id === action.payload.card.info.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.itemCount += 1;
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.card.info.id === action.payload.card.info.id
      );
      if (item) {
        item.quantity += 1;
        state.itemCount += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.card.info.id === action.payload.card.info.id
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.itemCount -= 1;
      } else if (item && item.quantity === 1) {
        state.items = state.items.filter(
          (i) => i.card.info.id !== action.payload.card.info.id
        );
        state.itemCount -= 1;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.itemCount = 0;
    },
  },
});

export const { addItem, increaseQuantity, decreaseQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
