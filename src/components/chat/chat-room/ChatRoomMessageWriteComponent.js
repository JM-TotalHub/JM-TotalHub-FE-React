import React from 'react';
import { useSelector } from 'react-redux';

const ChatRoomMessageWriteComponent = () => {
  const { chatRoomDetails, status, error } = useSelector(
    (state) => state.chat.chatRoomDetails
  );

  if (status === 'error') {
    return <div>Loading... 데이터를 요청실패.</div>;
  }

  if (status === 'idle') {
    return <div>로딩 중입니다...</div>;
  }

  if (status === 'succeeded') {
    const { chatRoomInfo, chatRoomMembers, chatRoomMessages } = chatRoomDetails;

    return (
      <div>
        <h1>채팅 작성</h1>
      </div>
    );
  }
};

export default ChatRoomMessageWriteComponent;
