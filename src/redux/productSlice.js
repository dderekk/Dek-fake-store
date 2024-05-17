// src/redux/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category) => {
    const res = await fetch(`https://fakestoreapi.com/products/category/${category}`);
    if (!res.ok) {
      const text = await res.text();
      console.error('Error in fetchProductsByCategory:', text);
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    return { category, data };
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    data: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data[action.payload.category] = action.payload.data;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default productSlice.reducer;
