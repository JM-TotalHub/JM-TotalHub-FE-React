import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../utils/connections/api';

const chatRoomDetailsByChatRoomId = createAsyncThunk(
  'chatRoomDetails/chatRoomDetailsByChatRoomId',
  async ({ chatRoomId }) => {
    const response = await api.get(`/chats/chat-rooms/${chatRoomId}`);
    return response.data;
  }
);

export default chatRoomDetailsByChatRoomId;
