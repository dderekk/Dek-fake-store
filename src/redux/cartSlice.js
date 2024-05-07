import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},
  totalQuantity: 0,
  totalAmount: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const item = action.payload;
      if (!state.items[item.id]) {
        state.items[item.id] = { ...item, quantity: 1 };
      } else {
        state.items[item.id].quantity++;
      }
      state.totalQuantity++;
      state.totalAmount += item.price;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      if (state.items[id].quantity === 1) {
        delete state.items[id];
      } else {
        state.items[id].quantity--;
      }
      state.totalQuantity--;
      state.totalAmount -= state.items[id].price;
    },
    clearItemFromCart(state, action) {
      const id = action.payload;
      const removedQuantity = state.items[id].quantity;
      const removedAmount = state.items[id].price * removedQuantity;
      delete state.items[id];
      state.totalQuantity -= removedQuantity;
      state.totalAmount -= removedAmount;
    }
  }
});

export const { addItemToCart, removeItemFromCart, clearItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
