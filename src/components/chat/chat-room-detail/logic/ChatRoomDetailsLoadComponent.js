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

  const { chatRoomInfo, status, error } = useSelector(
    (state) => state.chat.chatRoomDetails
  );

  useEffect(() => {
    const { leaveChatRoom } = ChatRoomEmitterHandler(socket, chatRoomId);

    dispatch(
      chatRoomDetailsByChatRoomId({
        chatRoomId,
      })
    );

    return () => {
      // 채팅방 나가기
      leaveChatRoom(chatRoomId);
      // 채팅방 참가 상태값 변경
      dispatch(offChatRoom());
      // 채팅방 정보 상태값 초기화
      dispatch(chatRoomDetailsSliceResetState());
    };
  }, [chatRoomId]);

  useEffect(() => {
    if (status == 'succeeded') {
      const { joinChatRoom } = ChatRoomEmitterHandler(socket, chatRoomId);

      console.log('방참가');
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
        </div>
        <div></div>
      </div>
    );
  }
};

export default ChatRoomDetailsLoadComponent;
