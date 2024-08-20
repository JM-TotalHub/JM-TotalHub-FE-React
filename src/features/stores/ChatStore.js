import { combineReducers } from 'redux';

import ChatRoomSocketStateSlice from '../domains/chat/chat-room-socket/slice/ChatRoomSocketStateSlice';
import chatRoomDetailsSlice from '../domains/chat/chat-room/slices/ChatRoomDetailsSlice';
import chatRoomListSlice from '../domains/chat/chat-room/slices/ChatRoomListSlice';

const chatReducer = combineReducers({
  chatRoomList: chatRoomListSlice.reducer,
  chatRoomDetails: chatRoomDetailsSlice.reducer,
  chatRoomSocketState: ChatRoomSocketStateSlice.reducer,
});

export default chatReducer;
