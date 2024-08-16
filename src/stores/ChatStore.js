import { combineReducers } from 'redux';

import chatRoomListSlice from '../features/chat/chat-room/slices/ChatRoomListSlice';
import chatRoomDetailsSlice from '../features/chat/chat-room/slices/ChatRoomDetailsSlice';
import chatRoomStateSlice from '../features/chat/chat-room/slices/ChatRoomStateSlice';

const chatReducer = combineReducers({
  chatRoomList: chatRoomListSlice.reducer,
  chatRoomDetails: chatRoomDetailsSlice.reducer,
  chatRoomStateSlice: chatRoomDetailsSlice.reducer,
});

export default chatReducer;
