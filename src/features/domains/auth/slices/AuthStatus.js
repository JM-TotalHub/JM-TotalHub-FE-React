import { createSlice } from '@reduxjs/toolkit';
import React from 'react';

const AuthStatusSlice = createSlice({
  name: 'authStatus',
  initialState: {
    accessToken: true,
    error: null,
  },
  reducers: {
    getNewAccessToken: (state, action) => {
      state.accessToken = false;
    },
    setNewAccessToken: (state, action) => {
      state.accessToken = true;
    },
  },
  //   extraReducers: {},
});

export const { getNewAccessToken, setNewAccessToken } = AuthStatusSlice.actions;
export default AuthStatusSlice;
