import './App.css';

// App.js
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import MainPageComponents from './components/main/MainPageComponents';
import Auth from './pages/auth';
import Board from './pages/board';
import Chat from './pages/chat';
import Test from './pages/test/Test';

import { SocketProvider } from './utils/connections/SocketProvider';

import UserInfoLoader from './components/auth/UserInfoLoader';
import UserHeaderComponent from './components/header/UserHeaderComponent';
import AuthListenerHandler from './utils/connections/socket-handler/auth/AuthListenerHandler';
import ChatRoomListenerHandler from './utils/connections/socket-handler/chat-room/ChatRoomListenerHandler';
import NotifyListenerHandler from './utils/connections/socket-handler/notification/NotifyListenerHandler';

const App = () => {
  // 현재 경로가 /auth로 시작하는지 확인
  const location = useLocation();
  const isAuthPath = location.pathname.startsWith('/auth');

  return (
    <SocketProvider>
      {/* 소캣 리스너 */}
      <AuthListenerHandler />
      <NotifyListenerHandler />
      <ChatRoomListenerHandler />
      {/* <ChatRoomVideoListenerHandler /> */}
      {/* <ChatRoomVideoListenerHandler2 /> */}

      {/* 유저 정보 로드 */}
      <UserInfoLoader />
      {!isAuthPath && <UserHeaderComponent />}

      {/* 라우터 */}
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
