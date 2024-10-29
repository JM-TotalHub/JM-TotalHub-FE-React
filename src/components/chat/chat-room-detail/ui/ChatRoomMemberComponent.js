import React from 'react';
import { useSelector } from 'react-redux';
import { ChatRoomMemberContainer } from '../../../../pages/chat/chat-room/styles/ChatRoomDetailsStyles';

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
        <div>
          <h1>참가인원</h1>
          {chatRoomMembers.map((member, index) => {
            return (
              <div key={index}>
                <div>
                  ID: {member.id} || email: {member.email} || NickName:{' '}
                  {member.nickname}
                </div>
              </div>
            );
          })}
        </div>
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
