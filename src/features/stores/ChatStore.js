import { combineReducers } from 'redux';

import chatRoomListSlice from '../domains/chat/chat-room/slices/ChatRoomListSlice';
import chatRoomDetailsSlice from '../domains/chat/chat-room/slices/ChatRoomDetailsSlice';
import chatRoomStateSlice from '../domains/chat/chat-room/slices/ChatRoomStateSlice';

const chatReducer = combineReducers({
  chatRoomList: chatRoomListSlice.reducer,
  chatRoomDetails: chatRoomDetailsSlice.reducer,
  chatRoomStateSlice: chatRoomDetailsSlice.reducer,
});

export default chatReducer;
