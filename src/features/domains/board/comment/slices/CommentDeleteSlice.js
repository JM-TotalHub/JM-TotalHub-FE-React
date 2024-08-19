import { createSlice } from '@reduxjs/toolkit';
import CommentDeleteByCommentId from '../actions/CommentDeleteAction';

const CommentDeleteSlice = createSlice({
  name: 'CommentDelete',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CommentDeleteByCommentId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(CommentDeleteByCommentId.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(CommentDeleteByCommentId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default CommentDeleteSlice;
