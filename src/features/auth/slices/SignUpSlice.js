import { createSlice } from '@reduxjs/toolkit';
import authSignUpByUserData from '../actions/SignUpAction';

const authSignUpSlice = createSlice({
  name: 'authSignUp',
  initialState: {
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authSignUpByUserData.pending, (state) => {
        // API 요청 시작 상태
        state.status = 'loading';
      })
      .addCase(authSignUpByUserData.fulfilled, (state, action) => {
        // API 요청 성공 상태
        state.status = 'succeeded';
        state.token = action.payload.token;
      })
      .addCase(authSignUpByUserData.rejected, (state, action) => {
        // API 요청 실패 상태
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default authSignUpSlice;
