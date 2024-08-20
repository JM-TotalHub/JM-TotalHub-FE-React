import { createSlice } from '@reduxjs/toolkit';

const ChatRoomSocketStateSlice = createSlice({
  name: 'ChatRoomSocketStateSlice',
  initialState: {
    useChatRoom: false,
  },
  reducers: {
    openChatRoom: (state, action) => {
      state.useChatRoom = true;
    },
    closeChatRoom: (state, action) => {
      state.useChatRoom = false;
    },
  },
});

export default ChatRoomSocketStateSlice;
