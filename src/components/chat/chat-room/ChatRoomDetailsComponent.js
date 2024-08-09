import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import chatRoomDetailsByChatRoomId from '../../../features/chat/chat-room/actions/ChatRoomDetailsAction';

const ChatRoomDetailsComponent = ({ chatRoomId }) => {
  const dispatch = useDispatch();

  const { chatRoomDetails, status, error } = useSelector(
    (state) => state.chat.chatRoomDetails
  );

  useEffect(() => {
    dispatch(
      chatRoomDetailsByChatRoomId({
        chatRoomId,
      })
    );
  }, [dispatch, chatRoomId]);

  if (status === 'error') {
    return <div>Loading... 데이터를 요청실패.</div>;
  }

  if (status === 'idle') {
    return <div>로딩 중입니다...</div>;
  }

  if (status === 'succeeded') {
    const { chatRoomInfo, chatRoomMembers, chatRoomMessages } = chatRoomDetails;

    console.log('status : ', status);
    console.log('chatRoomDetails : ', chatRoomDetails);
    console.log('chatRoomInfo : ', chatRoomInfo);
    console.log('chatRoomMember : ', chatRoomMembers);
    console.log('chatRoomMessages : ', chatRoomMessages);

    return (
      <div>
        <h1>ChatRoomDetailsComponent</h1>
        <div>
          <div>{chatRoomInfo.id}</div>
          <div>{chatRoomInfo.name}</div>
          <div>{chatRoomInfo.description}</div>
          <div>{chatRoomInfo.chat_type}</div>
          <div>{chatRoomInfo.created_at}</div>
        </div>
        <div>{chatRoomMembers[0].id}</div>
        <div>{chatRoomMembers[0].email}</div>

        <div></div>
      </div>
    );
  }
};

export default ChatRoomDetailsComponent;
