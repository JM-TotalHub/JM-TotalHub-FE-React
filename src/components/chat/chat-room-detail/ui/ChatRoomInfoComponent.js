import React from 'react';
import { useSelector } from 'react-redux';
import { ChatRoomInfoContainer } from '../../../../pages/chat/chat-room/styles/ChatRoomDetailsStyles';

const ChatRoomInfoComponent = ({ useChatRoomVideo }) => {
  const { chatRoomMembers, status, error } = useSelector(
    (state) => state.chat.chatRoomDetails
  );

  return (
    <ChatRoomInfoContainer useChatRoomVideo={useChatRoomVideo}>
      {/* <h3>ChatRoomInfoComponent</h3> */}
    </ChatRoomInfoContainer>
  );
};

export default ChatRoomInfoComponent;
