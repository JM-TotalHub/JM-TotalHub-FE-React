import { combineReducers } from 'redux';

import chatRoomDetailsSlice from '../domains/chat/chat-room/slices/ChatRoomDetailsSlice';
import chatRoomListSlice from '../domains/chat/chat-room/slices/ChatRoomListSlice';
import ChatRoomMessageStatusSlice from '../domains/chat/chat-room/slices/ChatRoomMessageStatusSlice';
import ChatRoomVideoStatusSlice from '../domains/chat/chat-room/slices/ChatRoomVideoStatusSlice';
import ChatRoomWebRtcSlice from '../domains/chat/chat-room/slices/ChatRoomWebRtcSlice';

const chatReducer = combineReducers({
  chatRoomList: chatRoomListSlice.reducer,
  chatRoomDetails: chatRoomDetailsSlice.reducer,
  chatRoomMessageStatus: ChatRoomMessageStatusSlice.reducer,
  chatRoomVideoStatus: ChatRoomVideoStatusSlice.reducer,
  chatRoomWebRtcStatus: ChatRoomWebRtcSlice.reducer,
});

export default chatReducer;
