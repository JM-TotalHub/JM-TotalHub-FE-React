import './App.css';

// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainPageComponents from './components/main/MainPageComponents';
import Auth from './pages/auth';
import Board from './pages/board';
import Chat from './pages/chat';
import Test from './pages/test/Test';
import { SocketProvider } from './utils/connections/SocketProvider';
import NotifyListenerHandler from './utils/connections/socket-handler/notification/NotifyListenerHandler';
import ChatRoomListenerHandler from './utils/connections/socket-handler/chat-room/ChatRoomListenerHandler';

const App = () => {
  return (
    <SocketProvider>
      {/* 소캣 리스너 */}
      <NotifyListenerHandler />
      <ChatRoomListenerHandler />

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
