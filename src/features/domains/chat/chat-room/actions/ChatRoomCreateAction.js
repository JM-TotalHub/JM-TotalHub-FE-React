import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../../utils/connections/api';

// 이건 백엔드 express 대한 요청(데이터베이스 최신화) => 시그널 서버의 현 채팅방 정보 => 응답
// 딱 요청 했을 때의 참가자 정보를 데이터베이스 적용, 시그널 서버 레디스 정보 적용
// 사실 응답값 필요없음, 나중에 쓸모없으면 안 받는 것도 방법
const ChatRoomCreateAction = createAsyncThunk(
  'chatRoomList/ChatRoomCreateAction',
  async ({ bodyData }) => {
    const response = await api.post(`/chats/chat-rooms`, bodyData);
    return response.data;
  }
);

export default ChatRoomCreateAction;
