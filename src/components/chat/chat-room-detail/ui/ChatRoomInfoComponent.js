import React from 'react';
import { useSelector } from 'react-redux';

const ChatRoomInfoComponent = () => {
  const { chatRoomMembers, status, error } = useSelector(
    (state) => state.chat.chatRoomDetails
  );

  return (
    <div>
      <h3>ChatRoomInfoComponent</h3>
    </div>
  );
};

export default ChatRoomInfoComponent;
