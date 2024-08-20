import { createSlice } from '@reduxjs/toolkit';
import React from 'react';

// 채팅방 관련 전체적인 상태값을 관리하는 슬라이스 <= 안쓰고 있는중

const chatRoomStateSlice = createSlice({
  name: 'chatRoomStateSlice',
  initialState: {
    chatRoomStates: {},
    joinChatRoomNum: 0,
    status: 'idle',
    error: null,
  },
  reducers: {
    joinChatRoom: (state, action) => {
      const { chatRoomInfo, chatRoomMembers, chatRoomMessages } =
        action.payload; // chatRoomDetails
      const roomId = chatRoomInfo.id;
      if (!state.chatRoomStates[roomId]) {
        state.chatRoomStates[roomId] = {
          chatRoomInfo: {
            ...chatRoomInfo,
          },
          chatRoomMembers: [...chatRoomMembers],
          chatRoomMessages: [...chatRoomMessages],
        };
      } else {
        console.log('참가중인 방 다시 참가요청함');
      }
    },
    leaveChatRoom: (state, action) => {
      state.chatRoomStates = state.chatRoomStates.filter(
        (chatRoom) => chatRoom !== action.payload // chatRoomId
      );
    },
    sendMessage: (state, action) => {},
    receiveMessage: (state, action) => {},

    // 추가 구현 필요한 함수들
    // 1. 나말고 멤버가 나갔을 때
    // 2. ...
  },
  extraReducers: {},
});

export const { joinChatRoom, leaveChatRoom, sendMessage, receiveMessage } =
  chatRoomStateSlice.actions;
export default chatRoomStateSlice;

// 데이터 구조
// chatRoomStates: {
//     // 채팅방 ID를 키로 사용
//     roomId1: {
//       details: {
//         name: '채팅방 이름',
//         createdAt: '생성 날짜',
//         // 필요에 따라 추가 세부정보
//       },
//       members: ['user1', 'user2'], // 참가 멤버 목록
//       messages: [
//         { sender: 'user1', content: '안녕하세요', timestamp: '시간' },
//         { sender: 'user2', content: '안녕하세요!', timestamp: '시간' },
//       ],
//     },
// }
