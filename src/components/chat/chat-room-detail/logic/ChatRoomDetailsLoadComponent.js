import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import chatRoomDetailsByChatRoomId from '../../../../features/domains/chat/chat-room/actions/ChatRoomDetailsAction';
import ChatRoomEmitterHandler from '../../../../utils/connections/socket-handler/chat-room/ChatRoomEmitterHandler';
import { chatRoomDetailsSliceResetState } from '../../../../features/domains/chat/chat-room/slices/ChatRoomDetailsSlice';
import {
  offChatRoom,
  onChatRoom,
} from '../../../../features/domains/chat/chat-room/slices/ChatRoomMessageStatusSlice.js';
import { useSocket } from '../../../../utils/connections/SocketProvider';

// 채팅방-메시지 데이터 로드및 채팅방 연결
const ChatRoomDetailsLoadComponent = ({ chatRoomId }) => {
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const { userInfo } = useSelector((state) => state.auth.userInfo);

  const { chatRoomInfo, status, error } = useSelector(
    (state) => state.chat.chatRoomDetails
  );

  useEffect(() => {
    const { leaveChatRoom } = ChatRoomEmitterHandler(socket);

    dispatch(
      chatRoomDetailsByChatRoomId({
        chatRoomId,
      })
    );

    // 언마운트 안되는 경우를 대비한 동작 ()
    const handleBeforeUnload = (event) => {
      // event.preventDefault();
      // event.returnValue = '';

      leaveChatRoom(userInfo.id, chatRoomId);
      // 채팅방 참가 상태값 변경
      dispatch(offChatRoom());
      // 채팅방 정보 상태값 초기화
      dispatch(chatRoomDetailsSliceResetState());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // 채팅방 나가기
      leaveChatRoom(userInfo.id, chatRoomId);
      // 채팅방 참가 상태값 변경
      dispatch(offChatRoom());
      // 채팅방 정보 상태값 초기화
      dispatch(chatRoomDetailsSliceResetState());

      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [chatRoomId]);

  useEffect(() => {
    if (status == 'succeeded') {
      const { joinChatRoom } = ChatRoomEmitterHandler(socket);

      // 채팅방 참가
      joinChatRoom(chatRoomId);
      // 채팅방 참가 상태값 변경
      dispatch(onChatRoom());
    }
  }, [chatRoomId, status]);

  if (status === 'succeeded') {
    return (
      <div>
        <h3>개발용 채팅방 데이터 확인</h3>
        <div>
          <div>chatRoomInfo.id : {chatRoomInfo.id}</div>
          <div>chatRoomInfo.name : {chatRoomInfo.name}</div>
          <div>chatRoomInfo.description : {chatRoomInfo.description}</div>
          <div>chatRoomInfo.chat_type : {chatRoomInfo.chat_type}</div>
          <div>chatRoomInfo.created_at : {chatRoomInfo.created_at}</div>
          <div>chatRoomInfo.user_id : {chatRoomInfo.user_id}</div>
        </div>
        <div></div>
      </div>
    );
  }
};

export default ChatRoomDetailsLoadComponent;
