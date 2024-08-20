import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import chatRoomDetailsByChatRoomId from '../../../../features/domains/chat/chat-room/actions/ChatRoomDetailsAction';
import { chatRoomDetailsSliceResetState } from '../../../../features/domains/chat/chat-room/slices/ChatRoomDetailsSlice';
import ChatRoomEmitterHandler from '../../../../utils/connections/socket-handler/chat-room/ChatRoomEmitterHandler';
import ChatRoomListenerHandler from '../../../../utils/connections/socket-handler/chat-room/ChatRoomListenerHandler';
// 채팅방 데이터 로드및 관리용
const ChatRoomDetailsLoadComponent = ({ chatRoomId }) => {
  const dispatch = useDispatch();

  const { chatRoomInfo, status, error } = useSelector(
    (state) => state.chat.chatRoomDetails
  );

  console.log(
    'ChatRoomDetailsLoadComponent에서 랜더링 확인 & 상태값 : ',
    status
  );

  const { joinChatRoom, leaveChatRoom } = ChatRoomEmitterHandler(); // 훅 호출

  // useEffect(() => {
  //   ChatRoomListenerHandler(chatRoomId);
  // }, [chatRoomId]);

  useEffect(() => {
    console.log('hatRoomDetailsLoadComponent 유스 이팩트 동작');
    // ChatRoomListenerHandler(chatRoomId);

    dispatch(
      chatRoomDetailsByChatRoomId({
        chatRoomId,
      })
    );

    return () => {
      leaveChatRoom(chatRoomId);
      dispatch(chatRoomDetailsSliceResetState());
    };
  }, [dispatch, chatRoomId]);

  if (status === 'error') {
    return <div>Loading... 데이터를 요청실패.</div>;
  }

  if (status === 'idle') {
    return <div>로딩 중입니다...</div>;
  }

  if (status === 'succeeded') {
    joinChatRoom(chatRoomId);

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

  // return (
  //   <div>
  //     <ChatRoomListenerHandler />
  //   </div>
  // );
};

export default ChatRoomDetailsLoadComponent;
