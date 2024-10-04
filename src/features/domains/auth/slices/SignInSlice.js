import { createSlice } from '@reduxjs/toolkit';
import authSignInByUserData from '../actions/SignInAction';

const authSignInSlice = createSlice({
  name: 'authSignIn',
  initialState: {
    accessToken: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSignInByUserData.pending, (state) => {
        // API 요청 시작 상태
        state.status = 'loading';
      })
      .addCase(authSignInByUserData.fulfilled, (state, action) => {
        // API 요청 성공 상태
        state.status = 'succeeded';
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(authSignInByUserData.rejected, (state, action) => {
        // API 요청 실패 상태
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default authSignInSlice;
