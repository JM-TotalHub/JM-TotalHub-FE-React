import { createSlice } from '@reduxjs/toolkit';
import React from 'react';
import boardListByNothing from '../actions/BoardListAction';

const boardListSlice = createSlice({
  name: 'boardList',
  initialState: {
    boardList: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(boardListByNothing.pending, (state) => {
        // API 요청 시작 상태
        state.status = 'loading';
      })
      .addCase(boardListByNothing.fulfilled, (state, action) => {
        // API 요청 성공 상태
        state.status = 'succeeded';
        state.boardList = action.payload;
      })
      .addCase(boardListByNothing.rejected, (state, action) => {
        // API 요청 실패 상태
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default boardListSlice;
