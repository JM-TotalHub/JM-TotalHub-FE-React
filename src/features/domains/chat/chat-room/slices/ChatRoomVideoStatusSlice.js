import { createSlice } from '@reduxjs/toolkit';

const ChatRoomVideoStatusSlice = createSlice({
  name: 'ChatRoomVideoStatusSlice',
  initialState: {
    useChatRoomVideo: false,
  },
  reducers: {
    onChatRoomVideo: (state) => {
      state.useChatRoomVideo = true;
    },
    offChatRoomVideo: (state) => {
      state.useChatRoomVideo = false;
    },
  },
});

export const { onChatRoomVideo, offChatRoomVideo } =
  ChatRoomVideoStatusSlice.actions;
export default ChatRoomVideoStatusSlice;
