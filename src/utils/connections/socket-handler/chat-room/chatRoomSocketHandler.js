import { useEffect } from 'react';
import { useSocket } from '../../SocketProvider';
import { useDispatch, useSelector } from 'react-redux';

// 채팅방 참가, 나가기 관련 핸들러
// 기본적으로 채팅방 만들기가 별개의 api로 구현되어 id가 유일하니 채팅방 id를 기반으로 구현
const chatRoomSocketHandler = () => {
  const dispatch = useDispatch();
  const { socket, joinRoom, leaveRoom } = useSocket();
  const { joinChatRoomNum } = useSelector(
    (state) => state.chat.chatRoomStateSlice
  );

  useEffect(() => {
    if (!socket || !socket.connected) return;

    // 수신 함수
    socket.on(`chat-room-join-success`, (data) => {
      dispatch(joinChatRoom({ data }));
      socket.emit(`chat-room-join-notify`, {});
    });

    socket.on(`chat-room-message-receive`, (data) => {});

    return () => {
      if (joinChatRoomNum <= 0) {
        socket.off(`chat-room-join-success`);
        socket.off(`chat-room-message-receive`);
      }
    };
  }, [socket, joinChatRoomNum]);

  // 송신(호출)함수
  const joinChatRoom = (chatRoomId) => {
    joinRoom(`chat-room:${chatRoomId}`);
  };

  const leaveChatRoom = (chatRoomId) => {
    leaveRoom(`chat-room:${chatRoomId}`);
  };

  const sendMessage = (userId, chatRoomId) => {
    socket.emit(`chat-room:${chatRoomId}-message-send`);
  };
};

const ChatRoomSocketHandler = { joinChatRoom };

export default ChatRoomSocketHandler;
