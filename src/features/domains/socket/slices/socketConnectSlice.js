import { createSlice } from '@reduxjs/toolkit';

// 안쓰고 있는 중
const SocketConnectSlice = createSlice({
  name: 'socketConnect',
  initialState: {
    socket: null,
    connected: false,
  },
  reducers: {
    connectSocket: (state, action) => {
      state.socket = action.payload;
      state.connected = true;
    },
    disconnectSocket: (state, action) => {
      state.socket = null;
      state.connected = false;
    },
  },
});

export const { connectSocket, disconnectSocket } = SocketConnectSlice.actions;
export default SocketConnectSlice;
