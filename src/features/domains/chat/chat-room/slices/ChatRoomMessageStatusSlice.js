import { createSlice } from '@reduxjs/toolkit';

const ChatRoomMessageStatusSlice = createSlice({
  name: 'ChatRoomStateSlice',
  initialState: {
    useChatRoom: false,
  },
  reducers: {
    onChatRoom: (state) => {
      state.useChatRoom = true;
    },
    offChatRoom: (state) => {
      state.useChatRoom = false;
    },
  },
});

export const { onChatRoom, offChatRoom } = ChatRoomMessageStatusSlice.actions;
export default ChatRoomMessageStatusSlice;
