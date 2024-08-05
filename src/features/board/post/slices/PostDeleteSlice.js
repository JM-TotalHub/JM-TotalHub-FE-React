import { createSlice } from '@reduxjs/toolkit';
import PostDeleteActionByPostId from '../actions/PostDeleteAction';

const PostDeleteSlice = createSlice({
  name: 'postDelete',
  initialState: {
    status: 'idle',
    error: null,
  },
  reducers: {
    postDeleteSliceResetState: (state) => {
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(PostDeleteActionByPostId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(PostDeleteActionByPostId.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(PostDeleteActionByPostId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { postDeleteSliceResetState } = PostDeleteSlice.actions;
export default PostDeleteSlice;
