import { createSlice } from '@reduxjs/toolkit';
import userInfoByToken from '../actions/UserInfoAction';
import SignOutAction from '../actions/SignOutAction';

const UserInfoSlice = createSlice({
  name: 'authStatus',
  initialState: {
    userInfo: null,
    loginStatus: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userInfoByToken.pending, (state) => {})
      .addCase(userInfoByToken.fulfilled, (state, action) => {
        state.userInfo = action.payload;
        console.log(`유저 info 응답 : ${action.payload}`);
        if (action.payload) {
          state.loginStatus = true;
        }
      })
      .addCase(userInfoByToken.rejected, (state, action) => {})
      .addCase(SignOutAction.fulfilled, (state, action) => {
        state.userInfo = null;
        state.loginStatus = false;
      });
  },
});

export default UserInfoSlice;
