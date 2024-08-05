import './App.css';

// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainPageComponents from './components/main/MainPageComponents';
import Auth from './pages/auth';
import Board from './pages/board';
import Test from './pages/test/Test';
import Chat from './pages/chat';

// const API_URL = process.env.EXPRESS_API_URL;

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPageComponents />} />
      <Route path="/tests/*" element={<Test />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="/boards/*" element={<Board />} />
      <Route path="/chats/*" element={<Chat />} />
    </Routes>
  );
};

export default App;
