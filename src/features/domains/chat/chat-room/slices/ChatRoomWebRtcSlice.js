import { createSlice } from '@reduxjs/toolkit';

const ChatRoomWebRtcSlice = createSlice({
  name: 'ChatRoomWebRtcSlice',
  initialState: {
    peers: {},
    streams: {},
  },
  reducers: {
    addPeer: (state, action) => {
      const { userId, peer } = action.payload;
      console.log(`액션 코드에서 peer : ${peer}`);

      state.peers[userId] = peer;
    },
    removePeer: (state, action) => {
      const { userId } = action.payload;
      delete state.peers[userId];
    },
    addStream: (state, action) => {
      const { userId, stream } = action.payload;
      state.streams[userId] = stream;
    },
    removeStream: (state, action) => {
      const { userId } = action.payload;
      delete state.streams[userId];
    },
  },
});

export const { addPeer, removePeer, addStream, removeStream } =
  ChatRoomWebRtcSlice.actions;
export default ChatRoomWebRtcSlice;
