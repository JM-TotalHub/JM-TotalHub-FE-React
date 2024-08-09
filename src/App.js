import './App.css';

// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainPageComponents from './components/main/MainPageComponents';
import Auth from './pages/auth';
import Board from './pages/board';
import Test from './pages/test/Test';
import Chat from './pages/chat';
import { SocketProvider } from './utils/connections/SocketProvider';

const App = () => {
  return (
    <SocketProvider>
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
