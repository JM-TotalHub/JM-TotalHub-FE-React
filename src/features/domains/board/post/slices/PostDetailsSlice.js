import { createSlice } from '@reduxjs/toolkit';
import postDetailsByPostId from '../actions/PostDetailsAction';

const PostDetailsSlice = createSlice({
  name: 'postDetails',
  initialState: {
    postDetails: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postDetailsByPostId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postDetailsByPostId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.postDetails = action.payload;
      })
      .addCase(postDetailsByPostId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default PostDetailsSlice;
