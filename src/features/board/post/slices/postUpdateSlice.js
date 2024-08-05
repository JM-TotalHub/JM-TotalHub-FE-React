import { createSlice } from '@reduxjs/toolkit';
import postUpdateInitByPostId from '../actions/PostUpdateInitAction';
import postUpdateByPostIdAndData from '../actions/PostUpdateAction';

const postUpdateSlice = createSlice({
  name: 'postUpdate',
  initialState: {
    postDetails: {},
    getStatus: 'idle',
    updateStatus: 'idle',
    error: null,
  },
  reducers: {
    postUpdateSliceResetState: (state) => {
      state.postDetails = {};
      state.getStatus = 'idle';
      state.updateStatus = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postUpdateInitByPostId.pending, (state) => {
        state.getStatus = 'loading';
      })
      .addCase(postUpdateInitByPostId.fulfilled, (state, action) => {
        state.getStatus = 'succeeded';
        state.postDetails = action.payload;
      })
      .addCase(postUpdateInitByPostId.rejected, (state, action) => {
        state.getStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(postUpdateByPostIdAndData.pending, (state) => {
        state.updateStatus = 'loading';
      })
      .addCase(postUpdateByPostIdAndData.fulfilled, (state, action) => {
        state.updateStatus = 'succeeded';
        state.postDetails = action.payload;
      })
      .addCase(postUpdateByPostIdAndData.rejected, (state, action) => {
        state.updateStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { postUpdateSliceResetState } = postUpdateSlice.actions;
export default postUpdateSlice;
