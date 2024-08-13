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
import NotifySocketHandler from './utils/connections/socket-handler/NotifySocketHandler';

const App = () => {
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
