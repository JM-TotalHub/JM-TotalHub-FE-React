import { createSlice } from '@reduxjs/toolkit';
import userInfoByToken from '../actions/UserInfoAction';

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
      .addCase(userInfoByToken.rejected, (state, action) => {});
  },
});

export default UserInfoSlice;
