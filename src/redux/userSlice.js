// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  name: '',
  email: '',
  token: '',
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const { id, name, email, token } = action.payload;
      state.id = id;
      state.name = name;
      state.email = email;
      state.token = token;
      state.isLoggedIn = true;
    },
    clearUser(state) {
      state.id = '';
      state.name = '';
      state.email = '';
      state.token = '';
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
