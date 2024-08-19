import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import chatRoomDetailsByChatRoomId from '../../../../features/domains/chat/chat-room/actions/ChatRoomDetailsAction';
import ChatRoomSocketHandler from '../../../../utils/connections/socket-handler/chat-room/ChatRoomSocketHandler';
// 채팅방 데이터 로드및 관리용
const ChatRoomDetailsLoadComponent = ({ chatRoomId }) => {
  console.log('채팅방 데이터 호출 컴포넌트 chatRoomId : ', chatRoomId);

  const dispatch = useDispatch();
  const { joinChatRoom, leaveChatRoom, sendMessage } = ChatRoomSocketHandler(); // 훅 호출

  const {
    // chatRoomDetails,
    chatRoomInfo,
    chatRoomMembers,
    chatRoomMessages,
    status,
    error,
  } = useSelector((state) => state.chat.chatRoomDetails);

  useEffect(() => {
    dispatch(
      chatRoomDetailsByChatRoomId({
        chatRoomId,
      })
    );

    joinChatRoom(chatRoomId);

    return () => {
      leaveChatRoom(chatRoomId);
    };
  }, [dispatch, chatRoomId]);

  if (status === 'error') {
    return <div>Loading... 데이터를 요청실패.</div>;
  }

  if (status === 'idle') {
    return <div>로딩 중입니다...</div>;
  }

  if (status === 'succeeded') {
    console.log('status : ', status);
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
