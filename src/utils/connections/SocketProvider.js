import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import ENV from '../env';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  console.log('소캣 연결 요청 대상 : ', ENV.SIGNAL_SERVER_SOCKET_BASE_URL);

  useEffect(() => {
    const connectedSocket = io(ENV.SIGNAL_SERVER_SOCKET_BASE_URL, {
      transports: ['websocket'],
      withCredentials: true,
    });

    connectedSocket.on('connect', () => {
      console.log('Connected to signal server : ', connectedSocket.id);
      setSocket(connectedSocket);
    });

    connectedSocket.on('connect_error', (err) => {
      console.log(err.message);
      console.log(err.description);
      console.log(err.context);
    });

    return () => {
      connectedSocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
