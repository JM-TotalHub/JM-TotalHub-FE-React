const ChatRoomEmitterHandler = (socket) => {
  // console.log('핸들러 호출');

  const username = 'test-username';

  const joinChatRoom = (chatRoomId) => {
    if (socket && socket.connected) {
      // console.log('방 참가 시도');
      socket.emit('join-chat-room', { chatRoomId });
    }
  };

  const leaveChatRoom = (userId, chatRoomId) => {
    if (socket && socket.connected) {
      socket.emit('leave-chat-room', { userId, chatRoomId });
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
