import React, { createContext, useContext, useEffect } from 'react';
import io from 'socket.io-client';
import ENV from '../env';
import NotifySocketHandler from './socket-handler/NotifySocketHandler';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  console.log('소캣 연결 요청 대상 : ', ENV.SIGNAL_SERVER_SOCKET_BASE_URL);

  const socket = io(ENV.SIGNAL_SERVER_SOCKET_BASE_URL, {
    transports: ['websocket'],
    withCredentials: true,
  });

  socket.on('connect', () => {
    console.log('Connected to signal server : ', socket);
  });

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  socket.on('connect_error', (err) => {
    console.log(err.message);
    console.log(err.description);
    console.log(err.context);
  });

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
