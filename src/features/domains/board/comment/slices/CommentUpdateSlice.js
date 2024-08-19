import { createSlice } from '@reduxjs/toolkit';
import commentUpdateByCommentIdAndData from '../actions/CommentUpdateAction';
import commentUpdateInitByCommentId from '../actions/CommentUpdateInitAction';

const commentUpdateSlice = createSlice({
  name: 'commentUpdate',
  initialState: {
    commentDetails: {},
    getStatus: 'idle',
    updateStatus: 'idle',
    error: null,
  },
  reducers: {
    commentUpdateSliceResetState: (state) => {
      state.commentDetails = {};
      state.getStatus = 'idle';
      state.updateStatus = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(commentUpdateInitByCommentId.pending, (state) => {
        state.getStatus = 'loading';
      })
      .addCase(commentUpdateInitByCommentId.fulfilled, (state, action) => {
        state.getStatus = 'succeeded';
        state.commentDetails = action.payload;
      })
      .addCase(commentUpdateInitByCommentId.rejected, (state, action) => {
        state.getStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(commentUpdateByCommentIdAndData.pending, (state) => {
        state.updateStatus = 'loading';
      })
      .addCase(commentUpdateByCommentIdAndData.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded';
        state.commentDetails = action.payload;
      })
      .addCase(commentUpdateByCommentIdAndData.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { commentUpdateSliceResetState } = commentUpdateSlice.actions;
export default commentUpdateSlice;
