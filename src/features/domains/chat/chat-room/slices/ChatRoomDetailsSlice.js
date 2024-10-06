import { createSlice } from '@reduxjs/toolkit';
import chatRoomDetailsByChatRoomId from '../actions/ChatRoomDetailsAction';

const chatRoomDetailsSlice = createSlice({
  name: 'chatRoomDetails',
  initialState: {
    chatRoomInfo: {},
    chatRoomMembers: [],
    chatRoomMessages: [],
    chatRoomVideoMembers: [],
    status: 'idle',
    videoStatus: 'idle',
    error: null,
  },
  reducers: {
    chatRoomDetailsSliceResetState: (state) => {
      state.status = 'idle';
      state.error = null;
    },
    chatRoomAddMessage: (state, action) => {
      state.chatRoomMessages.push(action.payload);
    },
    chatRoomUserJoin: (state, action) => {
      console.log('새로운 채팅방 유저 리듀서함수 동작 :', action.payload);

      state.chatRoomMembers.push(action.payload);
    },
    chatRoomUserLeave: (state, action) => {
      state.chatRoomMembers = state.chatRoomMembers.filter(
        (member) => member.id !== action.payload
      );
    },
    chatRoomVideoUserJoin: (state, action) => {
      console.log(`새로운 화상채팅 유저 리듀서함수 동작 : ${action.payload}`);

      // state.chatRoomVideoMembers.push(action.payload);
      state.chatRoomVideoMembers = action.payload;
      state.videoStatus = 'succeeded';
    },
    chatRoomVideoUserLeave: (state, action) => {
      state.chatRoomVideoMembers = state.chatRoomVideoMembers.filter(
        (member) => member.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(chatRoomDetailsByChatRoomId.pending, (state) => {
        // API 요청 시작 상태
        state.status = 'loading';
      })
      .addCase(chatRoomDetailsByChatRoomId.fulfilled, (state, action) => {
        // API 요청 성공 상태
        state.status = 'succeeded';

        state.chatRoomDetails = action.payload;

        state.chatRoomInfo = action.payload.chatRoomInfo;

        state.chatRoomMembers = Array.isArray(action.payload.chatRoomMembers)
          ? action.payload.chatRoomMembers
          : [];

        state.chatRoomMessages = Array.isArray(action.payload.chatRoomMessages)
          ? action.payload.chatRoomMessages
          : [];

        state.chatRoomVideoMembers = Array.isArray(
          action.payload.chatRoomVideoMembers
        )
          ? action.payload.chatRoomVideoMembers
          : [];

        console.log('여기!! : ', action.payload.chatRoomVideoMembers);
      })
      .addCase(chatRoomDetailsByChatRoomId.rejected, (state, action) => {
        // API 요청 실패 상태
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  chatRoomDetailsSliceResetState,
  chatRoomAddMessage,
  chatRoomUserJoin,
  chatRoomUserLeave,
  chatRoomVideoUserJoin,
  chatRoomVideoUserLeave,
} = chatRoomDetailsSlice.actions;
export default chatRoomDetailsSlice;
