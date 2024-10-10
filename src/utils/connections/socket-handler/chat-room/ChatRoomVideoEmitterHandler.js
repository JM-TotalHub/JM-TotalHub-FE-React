const ChatRoomVideoEmitterHandler = (socket) => {
  console.log('ChatRoomVideoEmitterHandler 핸들러 호출');
  if (!socket || !socket.connected) {
    console.error('ChatRoomVideoEmitterHandler 소켓이 연결되지 않았습니다.');
  } else {
    console.log('ChatRoomVideoEmitterHandler 소캣 연결됨');
  }

  const joinChatRoomVideo = (userId, chatRoomId) => {
    if (socket && socket.connected) {
      socket.emit('chat-room-video', { type: 'join', userId, chatRoomId });
      console.log('화상채팅방 참가 시도 chatRoomId => ', chatRoomId);
    }
  };

  const leaveChatRoomVideo = (userId, chatRoomId) => {
    if (socket && socket.connected) {
      socket.emit('chat-room-video', { type: 'leave', userId, chatRoomId });
      console.log('화상채팅방 퇴장 시도 chatRoomId => ', chatRoomId);
    }
  };

  const sendIceCandidate = (chatRoomId, userId, iceCandidate) => {
    if (socket && socket.connected) {
      socket.emit('chat-room-video', {
        type: 'ice-candidate',
        chatRoomId,
        userId,
        iceCandidate,
      });
      console.log(`화상채팅 ice 후보 보냄 userId => ${userId}`);
    } else {
      console.error('소켓 연결이 끊겼습니다. ICE 후보 전송 실패.');
    }
  };

  const sendOffer = (chatRoomId, userId, targetId, offer) => {
    if (socket && socket.connected) {
      socket.emit('chat-room-video', {
        type: 'offer',
        chatRoomId,
        userId,
        targetId,
        offer,
      });
    }
    console.log(`화상채팅 offer 보냄 userId => ${userId}`);
  };

  const sendAnswer = (chatRoomId, userId, targetId, answer) => {
    console.log(
      `answer 소캣 요청 보냄 : ${userId} , chatRoomId : ${chatRoomId}`
    );

    if (socket && socket.connected) {
      socket.emit('chat-room-video', {
        type: 'answer',
        chatRoomId,
        userId,
        targetId,
        answer,
      });
      console.log(`화상채팅 answer 보냄 userId => ${userId}`);
    }
  };

  return {
    joinChatRoomVideo,
    leaveChatRoomVideo,
    sendIceCandidate,
    sendOffer,
    sendAnswer,
  };
};

export default ChatRoomVideoEmitterHandler;
