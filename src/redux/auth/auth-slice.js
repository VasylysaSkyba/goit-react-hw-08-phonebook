import { createSlice } from '@reduxjs/toolkit';
import { login, logout, signup } from './auth-operations';

const initialState = {
  user: {},
  isLogin: false,
  token: '',
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(signup.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, { payload }) => {
        const { user, token } = payload;
        state.loading = false;
        state.user = user;
        state.token = token;
        state.isLogin = true;
      })
      .addCase(signup.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
    
    .addCase(login.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(login.fulfilled, (state, { payload }) => {
      const { user, token } = payload;
      state.loading = false;
      state.user = user;
      state.token = token;
      state.isLogin = true;
    })
    .addCase(login.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    })
    .addCase(logout.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(logout.fulfilled, state => {
      state.loading = false;
      state.user = {};
      state.token = '';
      state.isLogin = false;
    })
    .addCase(logout.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
  });
  },
});

export const authReducer = authSlice.reducer;