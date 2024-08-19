import { createSlice } from '@reduxjs/toolkit';
import postCreateByBoardIdAndData from '../actions/PostCreateAction';

// 지금은 응답값을 받고 있지만, 나중에 필요없으면 제거 - express에서도 수정
const postCreateSlice = createSlice({
  name: 'postCreate',
  initialState: {
    postDetails: {},
    status: 'idle',
    error: null,
  },
  reducers: {
    postCreateSliceResetState: (state) => {
      state.postDetails = {};
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCreateByBoardIdAndData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postCreateByBoardIdAndData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.postDetails = action.payload;
      })
      .addCase(postCreateByBoardIdAndData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { postCreateSliceResetState } = postCreateSlice.actions;
export default postCreateSlice;
