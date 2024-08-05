import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatRoomPage from './chat-room';

const Chat = () => {
  return (
    <div>
      <h1>채팅 헤더삽입 예정</h1>
      <Routes>
        <Route path="/chat-rooms/*" element={<ChatRoomPage />} />
      </Routes>
    </div>
  );
};

export default Chat;
