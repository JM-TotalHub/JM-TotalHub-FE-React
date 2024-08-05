import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthStore';
import boardReducer from './BoardStore';
import chatReducer from './ChatStore';

const store = configureStore({
  reducer: {
    board: boardReducer,
    auth: authReducer,
    chat: chatReducer,
  },
});

export default store;
