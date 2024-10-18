import { createSlice } from '@reduxjs/toolkit';
import chatRoomDetailsByChatRoomId from '../actions/ChatRoomDetailsAction';
import ChatRoomMessageLoadAction from '../actions/ChatRoomMessageLoadAction';
import ChatRoomUpdateAction from '../actions/ChatRoomUpdateAction';

const chatRoomDetailsSlice = createSlice({
  name: 'chatRoomDetails',
  initialState: {
    status: 'idle',
    chatRoomInfo: {},
    chatRoomMembers: [],
    chatRoomMessages: [],
    chatRoomVideoMembers: [],
    newMessage: null,
    error: null,
  },
  reducers: {
    // 채팅방 처리상태 상태값 초기화
    chatRoomDetailsSliceResetState: (state) => {
      state.status = 'idle';
      state.error = null;
    },
    // 채팅방 새 메시지
    chatRoomAddMessage: (state, action) => {
      state.newMessage = action.payload.user_id;
      state.chatRoomMessages = [...state.chatRoomMessages, action.payload];
    },
    // 채팅방 새로운 참가자 추가
    chatRoomUserJoin: (state, action) => {
      state.chatRoomMembers = [...state.chatRoomMembers, action.payload];
    },
    // 채팅방 참가자 퇴장
    chatRoomUserLeave: (state, action) => {
      state.chatRoomMembers = state.chatRoomMembers.filter(
        (member) => member.id !== action.payload
      );
    },
    // 기존 화상채팅 참가자 목록 업로드
    chatRoomVideoUsers: (state, action) => {
      state.chatRoomVideoMembers = action.payload;
    },
    // 화상채팅 새로운 참가자 추가
    chatRoomVideoNewUserJoin: (state, action) => {
      state.chatRoomVideoMembers = [
        ...state.chatRoomVideoMembers,
        action.payload,
      ];
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
        // 기본 채팅방 정보 API 요청 시작 상태
        state.status = 'loading';
      })
      .addCase(chatRoomDetailsByChatRoomId.fulfilled, (state, action) => {
        // 기본 채팅방 정보 API 요청 성공 상태
        state.status = 'succeeded';
        state.newMessage = 'init';

        state.chatRoomInfo = action.payload.chatRoomInfo;
        state.chatRoomMembers = Array.isArray(action.payload.chatRoomMembers)
          ? action.payload.chatRoomMembers
          : [];
        state.chatRoomMessages = Array.isArray(action.payload.chatRoomMessages)
          ? action.payload.chatRoomMessages.map((message) => ({
              message_id: message.id,
              user_id: message.user_id,
              content: message.content,
              createdAt: message.created_at, // created_at을 createdAt으로 변경
            }))
          : [];

        state.chatRoomVideoMembers = Array.isArray(
          action.payload.chatRoomVideoMembers
        )
          ? action.payload.chatRoomVideoMembers
          : [];
      })
      // 기본 채팅방 정보 API 요청 실패 상태
      .addCase(chatRoomDetailsByChatRoomId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // 메시지 추가 로드
      .addCase(ChatRoomMessageLoadAction.fulfilled, (state, action) => {
        state.newMessage = null;

        if (action.payload.length === 0) {
          state.chatRoomMessages = ['end', ...state.chatRoomMessages];
        } else {
          const olderMessage = Array.isArray(action.payload)
            ? action.payload.map((message) => ({
                message_id: message.id,
                user_id: message.user_id,
                content: message.content,
                createdAt: message.created_at, // created_at을 createdAt으로 변경
              }))
            : [];

          state.chatRoomMessages = [...olderMessage, ...state.chatRoomMessages];
        }
      })
      .addCase(ChatRoomUpdateAction.fulfilled, (state, action) => {
        // console.log('기존 채팅방 정보 : ', state.chatRoomInfo);
        // console.log('수정된 채팅방 정보 : ', action.payload);

        state.chatRoomInfo = action.payload;
      });
  },
});

export const {
  chatRoomDetailsSliceResetState,
  chatRoomAddMessage,
  chatRoomUserJoin,
  chatRoomUserLeave,
  chatRoomVideoUsers,
  chatRoomVideoNewUserJoin,
  chatRoomVideoUserLeave,
} = chatRoomDetailsSlice.actions;
export default chatRoomDetailsSlice;
