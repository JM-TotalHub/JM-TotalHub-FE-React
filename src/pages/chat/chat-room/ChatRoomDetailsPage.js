import React from 'react';
import { useParams } from 'react-router-dom';
import ChatRoomDetailsComponent from '../../../components/chat/chat-room/ChatRoomDetailsComponent';

const ChatRoomDetailsPage = () => {
  const { chatRoomId } = useParams();

  return (
    <div>
      <h1>ChatRoomDetailsPage</h1>
      <ChatRoomDetailsComponent chatRoomId={chatRoomId} />
    </div>
  );
};

export default ChatRoomDetailsPage;
