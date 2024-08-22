import { useEffect } from 'react';
import { useSocket } from '../../SocketProvider';
import { useDispatch, useSelector } from 'react-redux';
import {
  chatRoomAddMessage,
  chatRoomUserJoin,
  chatRoomUserLeave,
} from '../../../../features/domains/chat/chat-room-message/slices/ChatRoomDetailsSlice';

const ChatRoomListenerHandler = () => {
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const { useChatRoom } = useSelector(
    (state) => state.chat.chatRoomMessageState
  );

  console.log('useChatRoom 상태값 : ', useChatRoom);

  useEffect(() => {
    if (!socket || !useChatRoom) return;

    console.log('채팅방 리스너 적용됨');

    socket.on('chat-room-join-success', handleJoinSuccess);
    socket.on('chat-room-new-message', handleMessageReceive);
    socket.on('chat-room-user-join', handleUserJoin);
    socket.on('chat-room-user-leave', handleUserLeave);

    return () => {
      socket.off('chat-room-join-success', handleJoinSuccess);
      socket.off('chat-room-new-message', handleMessageReceive);
    };
  }, [socket, useChatRoom]);

  console.log('리스너가 동작한다!!!!!!', useChatRoom);

  const handleJoinSuccess = (data) => {
    console.log('채팅방 연결 완료 : ', data);
  };

  const handleMessageReceive = (data) => {
    console.log('채팅방 메시지 수신:', data);
    dispatch(chatRoomAddMessage(data));
  };

  const handleUserJoin = (data) => {
    console.log('유저 들어옴 : ', data);
    dispatch(chatRoomUserJoin(data));
  };

  const handleUserLeave = (data) => {
    console.log('유저 떠남 : ', data.userId);
    dispatch(chatRoomUserLeave(data.userId));
  };
};

export default ChatRoomListenerHandler;
