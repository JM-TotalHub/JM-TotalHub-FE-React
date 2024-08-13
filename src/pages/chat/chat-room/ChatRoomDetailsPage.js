import React from 'react';
import { useParams } from 'react-router-dom';
import ChatRoomDetailsLoadComponent from '../../../components/chat/chat-room/ChatRoomDetailsLoadComponent';
import ChatRoomMemberComponent from '../../../components/chat/chat-room/ChatRoomMemberComponent';
import ChatRoomMessageListComponent from '../../../components/chat/chat-room/ChatRoomMessageListComponent';
import ChatRoomMessageWriteComponent from '../../../components/chat/chat-room/ChatRoomMessageWriteComponent';

const ChatRoomDetailsPage = () => {
  const { chatRoomId } = useParams();

  return (
    <div>
      <h1>ChatRoomDetailsPage</h1>
      <ChatRoomDetailsLoadComponent chatRoomId={chatRoomId} />
      <ChatRoomMemberComponent chatRoomId={chatRoomId} />
      <ChatRoomMessageListComponent chatRoomId={chatRoomId} />
      <ChatRoomMessageWriteComponent chatRoomId={chatRoomId} />
    </div>
  );
};

export default ChatRoomDetailsPage;
