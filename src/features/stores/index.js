import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthStore';
import boardReducer from './BoardStore';
import chatReducer from './ChatStore';
import socketReducer from './SocketStore';
import alertReducer from './AlertStore';
import configReducer from './ConfigStore';

const store = configureStore({
  reducer: {
    config: configReducer,
    socket: socketReducer,
    alert: alertReducer,
    board: boardReducer,
    auth: authReducer,
    chat: chatReducer,
  },
});

export default store;
