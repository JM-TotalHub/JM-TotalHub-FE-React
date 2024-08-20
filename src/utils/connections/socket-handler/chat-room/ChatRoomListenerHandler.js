import { useEffect } from 'react';
import { useSocket } from '../../SocketProvider';
import { useSelector } from 'react-redux';

const ChatRoomListenerHandler = () => {
  console.log('리스너 핸들러 호출');

  const { status, error } = useSelector((state) => state.chat.chatRoomDetails);

  const { socket } = useSocket();

  const handleJoinSuccess = (data) => {
    console.log(data);
  };

  const handleMessageReceive = (data) => {
    console.log('메시지 왔다!!!!');
    console.log('메시지 수신:', data);
  };

  useEffect(() => {
    console.log('리스터 상태값 :', status);

    if (!socket || !socket.connected || status != 'succeeded') return;

    console.log('리스너 실제적용');

    socket.on('chat-room-join-success', handleJoinSuccess);
    socket.on('chat-room-new-message', handleMessageReceive);

    return () => {
      socket.off('chat-room-join-success', handleJoinSuccess);
      socket.off('chat-room-new-message', handleMessageReceive);
    };
  }, [socket]);
};

export default ChatRoomListenerHandler;
