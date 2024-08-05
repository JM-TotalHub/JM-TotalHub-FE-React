import { createSlice } from '@reduxjs/toolkit';
import chatRoomListByNothing from '../actions/ChatRoomListAction';

const chatRoomListSlice = createSlice({
  name: 'chatRoomList',
  initialState: {
    chatRoomList: [],
    pageNum: 1,
    totalPage: 1,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(chatRoomListByNothing.pending, (state) => {
        // API 요청 시작 상태
        state.status = 'loading';
      })
      .addCase(chatRoomListByNothing.fulfilled, (state, action) => {
        // API 요청 성공 상태
        state.status = 'succeeded';
        state.chatRoomList = action.payload.chatRoomList;
        state.pageNum = action.payload.pageNum;
        state.totalPage = action.payload.totalPage;
        console.log(state.chatRoomList);
      })
      .addCase(chatRoomListByNothing.rejected, (state, action) => {
        // API 요청 실패 상태
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default chatRoomListSlice;
