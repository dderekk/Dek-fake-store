// ordersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Platform } from 'react-native';

const server = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';
const url = `http://${server}:3000`;

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (token) => {
  const response = await fetch(`${url}/orders/all`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const data = await response.json();

  if (data.status !== 'OK') {
    throw new Error(data.message || 'Failed to fetch orders.');
  }

  return data.orders.map(order => ({
    ...order,
    order_items: JSON.parse(order.order_items)
  }));
});

export const updateOrderStatus = createAsyncThunk('orders/updateOrderStatus', async ({ orderId, isPaid, isDelivered, token }) => {
  const response = await fetch(`${url}/orders/updateorder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ orderID: orderId, isPaid, isDelivered }),
  });
  const data = await response.json();
  
  if (data.status !== 'OK') {
    throw new Error(data.message || 'Failed to update order status.');
  }

  return { orderId, isPaid, isDelivered };
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const { orderId, isPaid, isDelivered } = action.payload;
        const index = state.orders.findIndex(order => order.id === orderId);
        if (index !== -1) {
          state.orders[index].is_paid = isPaid;
          state.orders[index].is_delivered = isDelivered;
        }
      });
  },
});

export const { clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
