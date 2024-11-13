import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../../utils/connections/api';

const chatRoomListByNothing = createAsyncThunk(
  'chatRoomList/chatRoomListByNothing',
  async ({ queryData }) => {
    const response = await api.get(`/chats/chat-rooms`);
    return response.data;
  }
);

export default chatRoomListByNothing;
