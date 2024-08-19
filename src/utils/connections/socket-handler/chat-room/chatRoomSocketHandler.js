import { useEffect } from 'react';
import { useSocket } from '../../SocketProvider';
import { useDispatch, useSelector } from 'react-redux';

const ChatRoomSocketHandler = () => {
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const { joinChatRoomNum } = useSelector(
    (state) => state.chat.chatRoomStateSlice
  );

  const handleJoinSuccess = (data) => {
    dispatch(joinChatRoom(data));
    console.log('채팅방 입장함 : ', data);
    socket.emit('chat-room-join-notify', {});
  };

  const handleMessageReceive = (data) => {
    console.log('메시지 수신:', data);
    // 메시지 상태 업데이트 로직 추가 가능
  };

  useEffect(() => {
    if (!socket || !socket.connected) return;

    // 송신 함수

    // 방참가 성공
    socket.on('chat-room-join-success', handleJoinSuccess);
    socket.on('chat-room-message-receive', handleMessageReceive);

    return () => {
      socket.off('chat-room-join-success', handleJoinSuccess);
      socket.off('chat-room-message-receive', handleMessageReceive);
    };
  }, [socket, dispatch, joinChatRoomNum]);

  // 수신 함수 (외부노출 함수)
  const joinChatRoom = (chatRoomId) => {
    console.log('방 참가 시도');

    socket.emit('join-chat-room', { roomId: chatRoomId });
  };

  const leaveChatRoom = (chatRoomId) => {
    socket.emit('leave-chat-room', { roomId: chatRoomId });
  };

  const sendMessage = (chatRoomId, message) => {
    if (socket && socket.connected) {
      socket.emit(`chat-room:${chatRoomId}-message-send`, { message });
    }
  };

  return {
    joinChatRoom,
    leaveChatRoom,
    sendMessage,
  };
};

export default ChatRoomSocketHandler;
