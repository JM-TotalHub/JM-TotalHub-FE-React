import './App.css';

// App.js
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import ENV from './utils/env';

import MainPageComponents from './components/main/MainPageComponents';
import Auth from './pages/auth';
import Board from './pages/board';
import Chat from './pages/chat';
import Test from './pages/test/Test';
import { SocketProvider } from './utils/connections/SocketProvider';
import NotifySocketHandler from './utils/connections/socket-handler/notification/NotifySocketHandler';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import {
  connectSocket,
  disconnectSocket,
} from './features/domains/socket/socketConnectSlice';

const App = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const socket = io(ENV.SIGNAL_SERVER_SOCKET_BASE_URL, {
  //     transports: ['websocket'],
  //     withCredentials: true,
  //   });

  //   dispatch(connectSocket(socket));

  //   socket.on('connect', () => {
  //     console.log('소캣 연결됨');
  //   });

  //   socket.on('disconnect', () => {
  //     dispatch(disconnectSocket());
  //     console.log('소캣 연결 해재됨');
  //   });

  //   return () => {
  //     socket.disconnect();
  //     dispatch(disconnectSocket());
  //   };
  // }, [dispatch]);

  return (
    <SocketProvider>
      <NotifySocketHandler />
      <Routes>
        <Route path="/" element={<MainPageComponents />} />
        <Route path="/tests/*" element={<Test />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/boards/*" element={<Board />} />
        <Route path="/chats/*" element={<Chat />} />
      </Routes>
    </SocketProvider>
  );
};

export default App;
