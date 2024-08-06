import { combineReducers } from 'redux';

import chatRoomListSlice from '../features/chat/chat-room/slices/ChatRoomListSlice';
import chatRoomDetailsSlice from '../features/chat/chat-room/slices/ChatRoomDetailsSlice';

const chatReducer = combineReducers({
  chatRoomList: chatRoomListSlice.reducer,
  chatRoomDetails: chatRoomDetailsSlice.reducer,
});

export default chatReducer;
