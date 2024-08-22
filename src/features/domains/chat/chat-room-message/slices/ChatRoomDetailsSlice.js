import { createSlice } from '@reduxjs/toolkit';
import chatRoomDetailsByChatRoomId from '../actions/ChatRoomDetailsAction';

const chatRoomDetailsSlice = createSlice({
  name: 'chatRoomDetails',
  initialState: {
    chatRoomInfo: {},
    chatRoomMembers: [],
    chatRoomMessages: [],
    status: 'idle',
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
      console.log('새로운 유저 리듀서함수 동작 :', action.payload);

      state.chatRoomMembers.push(action.payload);
    },
    chatRoomUserLeave: (state, action) => {
      state.chatRoomMembers = state.chatRoomMembers.filter(
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
        state.chatRoomMembers = action.payload.chatRoomMembers;
        state.chatRoomMessages = action.payload.chatRoomMessages;
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
} = chatRoomDetailsSlice.actions;
export default chatRoomDetailsSlice;
