import React from 'react';
import { useSelector } from 'react-redux';
import ChatRoomMessageWriteFormComponent from './ChatRoomMessageWriteFormComponent';

const ChatRoomMessageWriteComponent = () => {
  const { chatRoomInfo, chatRoomMembers, chatRoomMessages, status, error } =
    useSelector((state) => state.chat.chatRoomDetails);

  if (status === 'error') {
    return <div>Loading... 데이터를 요청실패.</div>;
  }

  if (status === 'idle') {
    return <div>로딩 중입니다...</div>;
  }

  if (status === 'succeeded') {
    return (
      <div>
        <h1>채팅 작성</h1>
        <ChatRoomMessageWriteFormComponent />
      </div>
    );
  }
};

export default ChatRoomMessageWriteComponent;
