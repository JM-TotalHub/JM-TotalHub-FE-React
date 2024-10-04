const ChatRoomVideoEmitterHandler = (socket) => {
  console.log('ChatRoomVideoEmitterHandler 핸들러 호출');

  const joinChatRoomVideo = (chatRoomId) => {
    if (socket && socket.connected) {
      console.log('화상채팅방 참가 시도 chatRoomId => ', chatRoomId);
      socket.emit('chat-room-video', { type: 'join', chatRoomId });
    }
  };

  const leaveChatRoomVideo = (chatRoomId) => {
    console.log('화상채팅방 퇴장 시도 chatRoomId => ', chatRoomId);
    if (socket && socket.connected) {
      socket.emit('chat-room-video', { type: 'leave', chatRoomId });
    }
  };

  const sendIceCandidate = (chatRoomId, userId, iceCandidate) => {
    console.log(`화상채팅 ice 후보 보냄 userId => ${userId}`);
    if (socket && socket.connected) {
      socket.emit('chat-room-video', {
        type: 'ice-candidate',
        chatRoomId,
        userId,
        iceCandidate,
      });
    }
  };

  const sendOffer = (chatRoomId, userId, offer) => {
    console.log(`화상채팅 offer 보냄 userId => ${userId}`);
    if (socket && socket.connected) {
      socket.emit('chat-room-video', {
        type: 'offer',
        chatRoomId,
        userId,
        offer,
      });
    }
  };

  return {
    joinChatRoomVideo,
    leaveChatRoomVideo,
    sendIceCandidate,
    sendOffer,
  };
};

export default ChatRoomVideoEmitterHandler;
