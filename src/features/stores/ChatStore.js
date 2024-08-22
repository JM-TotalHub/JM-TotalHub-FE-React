import { combineReducers } from 'redux';

import chatRoomDetailsSlice from '../domains/chat/chat-room-message/slices/ChatRoomDetailsSlice';
import chatRoomListSlice from '../domains/chat/chat-room-message/slices/ChatRoomListSlice';
import ChatRoomMessageStateSlice from '../domains/chat/chat-room-message/slices/ChatRoomMessageStateSlice';

const chatReducer = combineReducers({
  chatRoomList: chatRoomListSlice.reducer,
  chatRoomDetails: chatRoomDetailsSlice.reducer,

  chatRoomMessageState: ChatRoomMessageStateSlice.reducer,
});

export default chatReducer;
