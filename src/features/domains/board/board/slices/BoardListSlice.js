import { createSlice } from '@reduxjs/toolkit';
import React from 'react';
import boardListByNothing from '../actions/BoardListAction';

const boardListSlice = createSlice({
  name: 'boardList',
  initialState: {
    boardList: [],
    selectedBoard: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    selectBoard: (state, action) => {
      console.log('슬라이스 내용');
      console.log(state.boardList);
      console.log(action);

      state.selectedBoard = state.boardList.find(
        (board) => board.id === action.payload
      );
    },
  },
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
        console.log('동작');
        console.log(state.boardList);
      })
      .addCase(boardListByNothing.rejected, (state, action) => {
        // API 요청 실패 상태
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const { selectBoard } = boardListSlice.actions;
export default boardListSlice;
