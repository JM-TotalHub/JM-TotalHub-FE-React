import React from 'react';
import { useParams } from 'react-router-dom';
import ChatRoomDetailsLoadComponent from '../../../components/chat/chat-room-detail/logic/ChatRoomDetailsLoadComponent';
import ChatRoomMemberComponent from '../../../components/chat/chat-room-detail/ui/ChatRoomMemberComponent';
import ChatRoomMessageListComponent from '../../../components/chat/chat-room-detail/ui/ChatRoomMessageListComponent';
import ChatRoomMessageWriteComponent from '../../../components/chat/chat-room-detail/ui/ChatRoomMessageWriteComponent';
import ChatRoomInfoComponent from '../../../components/chat/chat-room-detail/ui/ChatRoomInfoComponent';

const ChatRoomDetailsPage = () => {
  const { chatRoomId } = useParams();

  console.log('페이지 재랜더링');

  return (
    <div>
      <h1>ChatRoomDetailsPage</h1>

      {/* 기능 컴포넌트 적용 */}
      <ChatRoomDetailsLoadComponent chatRoomId={chatRoomId} />

      {/* UI 컴포넌트 적용 */}
      <ChatRoomInfoComponent chatRoomId={chatRoomId} />
      <ChatRoomMemberComponent chatRoomId={chatRoomId} />
      <ChatRoomMessageListComponent chatRoomId={chatRoomId} />
      <ChatRoomMessageWriteComponent chatRoomId={chatRoomId} />
    </div>
  );
};

export default ChatRoomDetailsPage;
