import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const ChatRoomMessageListComponent = () => {
  const { chatRoomMessages, status, error } = useSelector(
    (state) => state.chat.chatRoomDetails
  );

  if (status === 'error') {
    return <div>Loading... 데이터를 요청실패.</div>;
  }

  if (status === 'idle') {
    return <div>로딩 중입니다...</div>;
  }

  if (status === 'succeeded') {
    console.log('현재 채팅 메시지 데이터 : ', chatRoomMessages);

    return (
      <div>
        <h1>채팅 메시지</h1>
        {chatRoomMessages.map((messageData, index) => {
          return (
            <div key={index}>
              <div
                dangerouslySetInnerHTML={{ __html: messageData.message }}
              ></div>
            </div>
          );
        })}
      </div>
    );
  }
};

export default ChatRoomMessageListComponent;
