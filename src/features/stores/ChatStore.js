import { combineReducers } from 'redux';

import chatRoomDetailsSlice from '../domains/chat/chat-room/slices/ChatRoomDetailsSlice';
import chatRoomListSlice from '../domains/chat/chat-room/slices/ChatRoomListSlice';
import ChatRoomMessageStatusSlice from '../domains/chat/chat-room/slices/ChatRoomMessageStatusSlice';
import ChatRoomVideoStatusSlice from '../domains/chat/chat-room/slices/ChatRoomVideoStatusSlice';

const chatReducer = combineReducers({
  chatRoomList: chatRoomListSlice.reducer,
  chatRoomDetails: chatRoomDetailsSlice.reducer,
  chatRoomMessageStatus: ChatRoomMessageStatusSlice.reducer,
  chatRoomVideoStatus: ChatRoomVideoStatusSlice.reducer,
});

export default chatReducer;
