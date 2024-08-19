import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import chatRoomDetailsByChatRoomId from '../../../features/domains/chat/chat-room/actions/ChatRoomDetailsAction';

// 채팅방 데이터 로드및 관리용
const ChatRoomDetailsLoadComponent = ({ chatRoomId }) => {
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
        <h3>개발용 채팅방 데이터 확인</h3>
        <div>
          <div>chatRoomInfo.id : {chatRoomInfo.id}</div>
          <div>chatRoomInfo.name : {chatRoomInfo.name}</div>
          <div>chatRoomInfo.description : {chatRoomInfo.description}</div>
          <div>chatRoomInfo.chat_type : {chatRoomInfo.chat_type}</div>
          <div>chatRoomInfo.created_at : {chatRoomInfo.created_at}</div>
        </div>
        <div></div>
      </div>
    );
  }
};

export default ChatRoomDetailsLoadComponent;
