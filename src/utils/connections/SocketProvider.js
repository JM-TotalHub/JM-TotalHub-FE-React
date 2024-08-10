import ENV from '../env';
import React, { createContext, useContext, useEffect } from 'react';
import io from 'socket.io-client';
import NotifySocketHandler from './socket-handler/NotifySocketHandler';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  console.log('소캣 연결 요청 대상 : ', ENV.SIGNAL_SERVER_SOCKET_BASE_URL);

  const socket = io(ENV.SIGNAL_SERVER_SOCKET_BASE_URL);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to signal server');
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  new NotifySocketHandler(socket);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
