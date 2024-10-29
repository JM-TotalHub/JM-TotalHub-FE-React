import React from 'react';
import { useSelector } from 'react-redux';
import ChatRoomMessageWriteFormComponent from './ChatRoomMessageWriteFormComponent';
import { ChatRoomMessageWriteContainer } from '../../../../pages/chat/chat-room/styles/ChatRoomDetailsStyles';

const ChatRoomMessageWriteComponent = ({ chatRoomId, useChatRoomVideo }) => {
  const { status, error } = useSelector((state) => state.chat.chatRoomDetails);

  if (status === 'error') {
    return <div>Loading... 데이터를 요청실패.</div>;
  }

  if (status === 'idle') {
    return <div>로딩 중입니다...</div>;
  }

  if (status === 'succeeded') {
    return (
      <ChatRoomMessageWriteContainer useChatRoomVideo={useChatRoomVideo}>
        <ChatRoomMessageWriteFormComponent chatRoomId={chatRoomId} />
      </ChatRoomMessageWriteContainer>
    );
  }
};

export default ChatRoomMessageWriteComponent;
