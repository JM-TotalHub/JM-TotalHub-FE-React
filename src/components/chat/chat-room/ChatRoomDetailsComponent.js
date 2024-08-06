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

  return (
    <div>
      <h1>ChatRoomDetailsComponent</h1>
      <div>
        <div>{chatRoomDetails.id}</div>
        <div>{chatRoomDetails.name}</div>
        <div>{chatRoomDetails.description}</div>
        <div>{chatRoomDetails.chat_type}</div>
        <div>{chatRoomDetails.created_at}</div>
      </div>
    </div>
  );
};

export default ChatRoomDetailsComponent;
