import React from 'react';
import { Route, Routes } from 'react-router-dom';

import ChatRoomListPage from './ChatRoomListPage';
import ChatRoomDetailsPage from './ChatRoomDetailsPage';

const ChatRoomPage = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<ChatRoomListPage />} />
        <Route path=":chatRoomId" element={<ChatRoomDetailsPage />} />
      </Routes>
    </div>
  );
};

export default ChatRoomPage;
