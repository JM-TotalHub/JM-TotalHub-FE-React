import React from 'react';
import { useSelector } from 'react-redux';
import {
  ChatRoomMemberContainer,
  StChatRoomMember,
} from '../../../../pages/chat/chat-room/styles/ChatRoomDetailsStyles';

const ChatRoomMemberComponent = ({ useChatRoomVideo }) => {
  const { chatRoomMembers, chatRoomVideoMembers, status, error } = useSelector(
    (state) => state.chat.chatRoomDetails
  );

  if (status === 'error') {
    return <div>Loading... 데이터를 요청실패.</div>;
  }

  if (status === 'idle') {
    return <div>로딩 중입니다...</div>;
  }

  if (status === 'succeeded') {
    return (
      <ChatRoomMemberContainer useChatRoomVideo={useChatRoomVideo}>
        <h3>화상채팅 참가자</h3>
        <StChatRoomMember>
          {chatRoomMembers.map((member, index) => {
            return (
              <div key={index}>
                <div>
                  {member.id} || {member.email} || {member.nickname}
                </div>
              </div>
            );
          })}
        </StChatRoomMember>
        {/* <div>
          <h1>화상채팅 참가인원</h1>
          {chatRoomVideoMembers.map((member, index) => {
            return (
              <div key={index}>
                <div>ID: {member.id}</div>
                <div>email: {member.email}</div>
                <div>NickName: {member.nickname}</div>
              </div>
            );
          })}
        </div> */}
      </ChatRoomMemberContainer>
    );
  }
  return null;
};

export default ChatRoomMemberComponent;
