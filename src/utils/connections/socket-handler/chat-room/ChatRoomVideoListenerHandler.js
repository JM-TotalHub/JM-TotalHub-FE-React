import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../SocketProvider';

const ChatRoomVideoListenerHandler = () => {
  const dispatch = useDispatch();
  const { socket } = useSocket();
  const { useChatRoom } = useSelector(
    (state) => state.chat.chatRoomMessageStatus
  );

  useEffect(() => {
    if (!socket || !useChatRoom) return;

    console.log('화상채팅 리스너 적용됨');

    socket.on('chat-room-video', handleMessageReceive);

    return () => {
      socket.off('chat-room-video', handleMessageReceive);
    };
  }, [socket, useChatRoom]);

  const handleMessageReceive = (data) => {
    console.log('화상채팅 요청 확인됨');

    switch (data.type) {
      case 'members':
        console.log('화상 채팅 새로운 참가자 메시지:', data.newMember);
        handleJoinVideoSuccess(data);
        break;
      case 'ice-candidate':
        console.log(
          `화상 채팅 새로운 참가자 메시지 => 대상자 : ${data.userId} & ice : ${data.candidate} `
        );
        handleIceCandidate(data);
        break;
      case 'offer':
        console.log(
          `화상 채팅 새로운 참가자 메시지 => 대상자 : ${data.userId} & offer : ${data.offer} `
        );
        handleOffer(data);
        break;
      default:
        console.log('알 수 없는 데이터 타입:', data);
    }
  };

  const handleJoinVideoSuccess = (data) => {
    console.log(`소캣 리스너 화상학습 handleJoinVideoSuccess 동작 `);
    console.log(data);
  };
  const handleIceCandidate = (data) => {
    console.log(`소캣 리스너 화상학습 handleIceCandidate 동작 `);
    console.log(data);
  };
  const handleOffer = (data) => {
    console.log(`소캣 리스너 화상학습 handleOffer 동작 `);
    console.log(data);
  };
};

export default ChatRoomVideoListenerHandler;
