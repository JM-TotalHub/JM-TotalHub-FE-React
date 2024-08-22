import { createSlice } from '@reduxjs/toolkit';

const ChatRoomMessageStateSlice = createSlice({
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

export const { onChatRoom, offChatRoom } = ChatRoomMessageStateSlice.actions;
export default ChatRoomMessageStateSlice;
