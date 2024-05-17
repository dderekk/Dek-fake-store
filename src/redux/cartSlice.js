import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  items: {},
  totalQuantity: 0,
  totalAmount: 0,
  status: 'idle',
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async (userId, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:3000/cart/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateCart = createAsyncThunk('cart/updateCart', async ({ userId, cart }, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:3000/cart/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cart),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

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
    },
    clearCart(state) {
      state.items = {};
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addItemToCart, removeItemFromCart, clearItemFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
