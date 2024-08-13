import { useEffect } from 'react';
import { useSocket } from '../SocketProvider';

const NotifySocketHandler = () => {
  const { socket } = useSocket();

  console.log('NotifySocketHandler 소캣 : ', socket);

  useEffect(() => {
    if (!socket || !socket.connected) return;

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket]);

  const handleNewMessage = (message) => {
    console.log(`새 알림: ${message}`);
  };
};

export default NotifySocketHandler;
