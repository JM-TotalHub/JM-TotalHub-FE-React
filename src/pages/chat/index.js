import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChatRoomPage from './chat-room';

const Chat = () => {
  return (
    <div>
      <Routes>
        <Route path="/chat-rooms/*" element={<ChatRoomPage />} />
      </Routes>
    </div>
  );
};

export default Chat;
