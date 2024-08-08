import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../utils/connections/api';

const chatRoomDetailsByChatRoomId = createAsyncThunk(
  'chatRoomDetails/chatRoomDetailsByChatRoomId',
  async ({ chatRoomId }) => {
    // const response = await api.get(`/chats/chat-rooms/${chatRoomId}`);
    const response = await api.post(`/chats/chat-rooms/${chatRoomId}/join`);
    return response.data;
  }
);

export default chatRoomDetailsByChatRoomId;
