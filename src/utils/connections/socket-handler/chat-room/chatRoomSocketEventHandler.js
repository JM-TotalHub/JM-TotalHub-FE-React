import { useEffect } from 'react';
import { useSocket } from '../../SocketProvider';
import { useSelector } from 'react-redux';

const ChatRoomSocketHandler = (chatRoomId) => {
  const { socket, joinRoom, leaveRoom } = useSocket();
  const { joinChatRoomNum } = useSelector(
    (state) => state.chat.chatRoomStateSlice
  );

  console.log('채팅방 이벤트 함수 활성화');

  useEffect(() => {
    if (!socket || !socket.connected || joinChatRoomNum <= 0) return;

    socket.on('newMessage', handleNewMessage);

    // 적용 이벤트들
    const handleChatRoomEvent = () => {
      console.log(`chat-room:${chatRoomId} 참가`);
      socket.on('notification-to-all', handleNotificationToAll);
    };

    // 알림 방 참가 확인 응답 받으면 소캣 이벤트 적용
    socket.on(`join-success-chat-room:${chatRoomId}`, handleChatRoomEvent);

    return () => {
      // 참여중인 채팅방이 하나도 없으면 이벤트 함수 꺼놓기
      if (joinChatRoomNum <= 0) {
        socket.off('newMessage', handleNewMessage);
      }
    };
  }, [socket, joinChatRoomNum]);

  const handleNewMessage = (message) => {
    console.log(`새 알림: ${message}`);
  };
};

export default ChatRoomSocketHandler;
