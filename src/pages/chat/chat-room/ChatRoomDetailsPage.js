import React from 'react';
import { useParams } from 'react-router-dom';
import ChatRoomDetailsLoadComponent from '../../../components/chat/chat-room-detail/logic/ChatRoomDetailsLoadComponent';
import ChatRoomMemberComponent from '../../../components/chat/chat-room-detail/ui/ChatRoomMemberComponent';
import ChatRoomMessageListComponent from '../../../components/chat/chat-room-detail/ui/ChatRoomMessageListComponent';
import ChatRoomMessageWriteComponent from '../../../components/chat/chat-room-detail/ui/ChatRoomMessageWriteComponent';
import ChatRoomListenerHandler from '../../../utils/connections/socket-handler/chat-room/ChatRoomListenerHandler';

const ChatRoomDetailsPage = () => {
  const { chatRoomId } = useParams();
  console.log('채팅방 디테일 페이지 채팅 방번호 : ', chatRoomId);

  return (
    <div>
      {/* 기능 컴포넌트 적용 */}
      <ChatRoomDetailsLoadComponent chatRoomId={chatRoomId} />
      <ChatRoomListenerHandler />

      <h1>ChatRoomDetailsPage</h1>
      {/* UI 컴포넌트 적용 */}
      <ChatRoomMemberComponent chatRoomId={chatRoomId} />
      <ChatRoomMessageListComponent chatRoomId={chatRoomId} />
      <ChatRoomMessageWriteComponent chatRoomId={chatRoomId} />
    </div>
  );
};

export default ChatRoomDetailsPage;
