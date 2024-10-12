// App.js
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Auth from './pages/auth';
import Board from './pages/board';
import Chat from './pages/chat';
import Test from './pages/test/Test';

import { SocketProvider } from './utils/connections/SocketProvider';

import UserInfoLoader from './components/auth/UserInfoLoader';
import MainHeaderComponent from './components/header/MainHeaderComponent';
import MainPage from './pages/MainPage';
import AuthListenerHandler from './utils/connections/socket-handler/auth/AuthListenerHandler';
import ChatRoomListenerHandler from './utils/connections/socket-handler/chat-room/ChatRoomListenerHandler';
import NotifyListenerHandler from './utils/connections/socket-handler/notification/NotifyListenerHandler';
import { StyledMainContent } from './AppCss';
import CommonAlertComponent from './components/alert/CommonAlertComponent';

const App = () => {
  const location = useLocation();
  const isAuthPath = location.pathname.startsWith('/auth');

  return (
    <SocketProvider>
      {/* 소캣 리스너 */}
      <AuthListenerHandler />
      <NotifyListenerHandler />
      <ChatRoomListenerHandler />

      {/* 유저 정보 로드 */}
      {/* <UserInfoLoader /> */}

      {/* 알림창 */}
      <CommonAlertComponent />

      {/* 해더 */}
      {!isAuthPath && <MainHeaderComponent />}

      {/* 페이지 라우터 */}
      <StyledMainContent>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/tests/*" element={<Test />} />
          <Route path="/auth/*" element={<Auth />} />
          <Route path="/boards/*" element={<Board />} />
          <Route path="/chats/*" element={<Chat />} />
        </Routes>
      </StyledMainContent>
    </SocketProvider>
  );
};

export default App;
