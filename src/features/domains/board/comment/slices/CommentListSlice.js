import { createSlice } from '@reduxjs/toolkit';
import React, { act } from 'react';
import commentListByPostId from '../actions/CommentListAction';

const commentListSlice = createSlice({
  name: 'commentList',
  initialState: {
    commentList: [],
    totalPage: 0,
    pageNum: 1,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(commentListByPostId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(commentListByPostId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.commentList = action.payload.commentList;
        state.totalPage = action.payload.totalPage;
        state.pageNum = action.payload.pageNum;
      })
      .addCase(commentListByPostId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default commentListSlice;
