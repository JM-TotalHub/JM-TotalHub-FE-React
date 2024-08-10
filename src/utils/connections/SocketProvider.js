import ENV from '../env';
import React, { createContext, useContext, useEffect } from 'react';
import io from 'socket.io-client';
import NotifySocketHandler from './socket-handler/NotifySocketHandler';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  console.log('소캣 연결 요청 대상 : ', ENV.SIGNAL_SERVER_SOCKET_BASE_URL);

  const socket = io(ENV.SIGNAL_SERVER_SOCKET_BASE_URL, {
    transports: ['websocket'],
    withCredentials: true, // CORS 설정에 따라 필요할 수 있음
  });

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to signal server');
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  socket.on('connect_error', (err) => {
    // the reason of the error, for example "xhr poll error"
    console.log(err.message);

    // some additional description, for example the status code of the initial HTTP response
    console.log(err.description);

    // some additional context, for example the XMLHttpRequest object
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
