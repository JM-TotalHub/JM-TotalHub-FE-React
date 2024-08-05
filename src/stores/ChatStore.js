import { combineReducers } from 'redux';

import chatRoomListSlice from '../features/chat/chat-room/slices/ChatRoomListSlice';

const chatReducer = combineReducers({
  chatRoomList: chatRoomListSlice.reducer,
});

export default chatReducer;
