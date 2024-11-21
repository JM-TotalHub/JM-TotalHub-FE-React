// App.js
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Auth from './pages/auth';
import Board from './pages/board';
import Chat from './pages/chat';
import Test from './pages/test/Test';

import { SocketProvider } from './utils/connections/SocketProvider';

import { ThemeProvider } from 'styled-components';
import {
  StyledAppContainer,
  StyledHeaderContent,
  StyledMainContent,
} from './AppCss';
import CommonAlertComponent from './components/alert/CommonAlertComponent';
import theme from './components/config/style/theme';
import MainHeaderComponent from './components/header/MainHeaderComponent';
import MainPage from './pages/main/MainPage';
import Overview from './pages/overview';
import User from './pages/user';
import AuthListenerHandler from './utils/connections/socket-handler/auth/AuthListenerHandler';
import ChatRoomListenerHandler from './utils/connections/socket-handler/chat-room/ChatRoomListenerHandler';
import NotifyListenerHandler from './utils/connections/socket-handler/notification/NotifyListenerHandler';
import Game from './pages/game';

const App = () => {
  const location = useLocation();
  const isAuthPath = location.pathname.startsWith('/auth');

  return (
    <SocketProvider>
      {/* 소캣 리스너 */}
      <AuthListenerHandler />
      <NotifyListenerHandler />
      <ChatRoomListenerHandler />

      {/* 유저 정보 로드 - 헤더에서 함수 호출중 */}
      {/* <UserInfoLoader /> */}

      {/* 설정 관련 - <현재 안쓰는 중>, 화면크기 관련은 theme을 통해 */}
      {/* <ScreenSizeConfigComponent /> */}

      <ThemeProvider theme={theme}>
        {/* 알림창 */}
        <CommonAlertComponent />

        <StyledAppContainer>
          {/* 해더 */}
          {!isAuthPath && (
            <StyledHeaderContent>
              <MainHeaderComponent />
            </StyledHeaderContent>
          )}

          {/* 페이지 라우터 */}
          <StyledMainContent>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/tests/*" element={<Test />} />
              <Route path="/users/*" element={<User />} />
              <Route path="/overviews/*" element={<Overview />} />
              <Route path="/auth/*" element={<Auth />} />
              <Route path="/boards/*" element={<Board />} />
              <Route path="/chats/*" element={<Chat />} />
              <Route path="/game/*" element={<Game />} />
            </Routes>
          </StyledMainContent>
        </StyledAppContainer>
      </ThemeProvider>
    </SocketProvider>
  );
};

export default App;
