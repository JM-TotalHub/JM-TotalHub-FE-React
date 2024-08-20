import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthStore';
import boardReducer from './BoardStore';
import chatReducer from './ChatStore';
import socketReducer from './SocketStore';

const store = configureStore({
  reducer: {
    socket: socketReducer,
    board: boardReducer,
    auth: authReducer,
    chat: chatReducer,
  },
});

export default store;
