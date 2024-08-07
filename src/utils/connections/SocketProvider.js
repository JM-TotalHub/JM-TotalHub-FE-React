// src/components/global/SocketProvider.js
import React, { createContext, useContext, useEffect } from 'react';
import io from 'socket.io-client';
import NotifySocketHandler from './socket-handler/NotifySocketHandler';

const SocketContext = createContext();

const ENV = process.env.REACT_APP_ENV_STATUS;
const SIGNAL_SERVER_IP =
  ENV === 'prod'
    ? `${process.env.REACT_APP_NGINX_SERVER_HOST}/signal/socket/`
    : `${process.env.REACT_APP_NGINX_SERVER_HOST}:7000`;

console.log('SIGNAL_SERVER_IP:', SIGNAL_SERVER_IP); // 여기에 추가

export const SocketProvider = ({ children }) => {
  const socket = io(SIGNAL_SERVER_IP);

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
