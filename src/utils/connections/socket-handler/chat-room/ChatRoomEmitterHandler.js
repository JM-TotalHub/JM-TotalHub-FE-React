import { useSocket } from '../../SocketProvider';

const ChatRoomEmitterHandler = (chatRoomId) => {
  console.log('핸들러 호출');

  const { socket } = useSocket();

  const username = 'test-username';

  const joinChatRoom = (chatRoomId) => {
    console.log('방 참가 시도');
    if (socket && socket.connected) {
      socket.emit('join-chat-room', { chatRoomId, username });
    }
  };

  const leaveChatRoom = (chatRoomId) => {
    if (socket && socket.connected) {
      socket.emit('leave-chat-room', { chatRoomId });
    }
  };

  const sendMessage = (chatRoomId, message) => {
    if (socket && socket.connected) {
      socket.emit(`chat-room-message-send`, { chatRoomId, username, message });
    }
  };

  return {
    joinChatRoom,
    leaveChatRoom,
    sendMessage,
  };
};

export default ChatRoomEmitterHandler;
