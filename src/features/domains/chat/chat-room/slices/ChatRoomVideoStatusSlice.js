import { createSlice } from '@reduxjs/toolkit';

// 화상채팅 상태값 관리 슬라이스
// useChatRoomVideo : 화상채팅 사용 유무 (버튼 눌렀는지)
// localStreamReady : 로컬 스트림 준비 상태 (이거 기반으로 webrtc 동작)
// chatRoomVideoDataReady : 화상채팅을 위한 데이터 준비 상태
// chatRoomVideoStart : 새로 들어온 사람이 offer 전송 하도록 & 이작업 중복 방지 겸

const ChatRoomVideoStatusSlice = createSlice({
  name: 'ChatRoomVideoStatusSlice',
  initialState: {
    useChatRoomVideo: false,
    localStreamReady: false,
    chatRoomVideoDataReady: false,
    chatRoomVideoStarted: false,
  },
  reducers: {
    onChatRoomVideo: (state) => {
      state.useChatRoomVideo = true;
    },
    offChatRoomVideo: (state) => {
      state.useChatRoomVideo = false;
    },
    onLocalStream: (state) => {
      state.localStreamReady = true;
    },
    offLocalStream: (state) => {
      state.localStreamReady = false;
    },
    onChatRoomVideoData: (state) => {
      state.chatRoomVideoDataReady = true;
    },
    offChatRoomVideoData: (state) => {
      state.chatRoomVideoDataReady = false;
    },
    onChatRoomVideoStarted: (state) => {
      state.chatRoomVideoStarted = true;
    },
    offChatRoomVideoStarted: (state) => {
      state.chatRoomVideoStarted = false;
    },
  },
});

export const {
  onChatRoomVideo,
  offChatRoomVideo,
  onLocalStream,
  offLocalStream,
  onChatRoomVideoData,
  offChatRoomVideoData,
  onChatRoomVideoStarted,
  offChatRoomVideoStarted,
} = ChatRoomVideoStatusSlice.actions;
export default ChatRoomVideoStatusSlice;
