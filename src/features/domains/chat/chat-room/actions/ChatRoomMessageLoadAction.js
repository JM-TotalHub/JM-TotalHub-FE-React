import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../../utils/connections/api';

// 메시지 리스트 스크롤 - 추가 메시지 요청
const ChatRoomMessageLoadAction = createAsyncThunk(
  'chatRoomDetails/ChatRoomMessageLoadAction',
  async ({ chatRoomId, lastMessageId, messageNum }) => {
    // console.log('액션 동작 => ', chatRoomId, lastMessageId, messageNum);

    const response = await api.get(`/chats/chat-rooms/messages-load`, {
      params: {
        chatRoomId,
        lastMessageId,
        messageNum,
      },
    });
    // console.log(response);
    return response.data;
  }
);

export default ChatRoomMessageLoadAction;
