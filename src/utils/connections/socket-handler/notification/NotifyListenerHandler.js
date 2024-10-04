import { useEffect } from 'react';
import { useSocket } from '../../SocketProvider';
import api from '../../api';

// 함수로서 구현하긴 했지만, 사실상 컴포넌트 처럼 적용해서 이름 대문자로 시작함
const NotifySocketHandler = () => {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket || !socket.connected) return;

    console.log('알림방 요청 보낸다~~~');

    // 알림 방 참가 요청
    socket.emit('join-notification-room');

    // 적용 이벤트들
    const handleRoomEvent = () => {
      console.log('notification-room 참가');
      socket.on('notification-to-all', handleNotificationToAll);
    };

    // 알림 방 참가 확인 응답 받으면 소캣 이벤트 적용
    socket.on('notification-room-join-success', handleRoomEvent);

    // 언마운트 시 이벤트 삭제
    return () => {
      socket.emit('leave-notification-room');
      socket.off('join-success-notification-room', handleRoomEvent);
      socket.off('notification-to-all', handleNotificationToAll);
    };
  }, [socket]);

  // 이벤트 콜백 함수들
  const handleNotificationToAll = (message) => {
    console.log(`새로운 전체 알림: ${message}`);
  };
};

export default NotifySocketHandler;
