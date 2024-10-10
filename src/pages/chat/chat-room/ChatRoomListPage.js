import React, { useState } from 'react';
import ChatRoomListComponent from '../../../components/chat/chat-room-list/ChatRoomListComponent';
import { useDispatch } from 'react-redux';
import ChatRoomCreateAction from '../../../features/domains/chat/chat-room/actions/ChatRoomCreateAction';
import ChatRoomCreateComponent from '../../../components/chat/chat-room-list/ChatRoomCreateComponent';

const ChatRoomListPage = () => {
  // const dispatch = useDispatch();

  const [createOpen, setCreateOpen] = useState(false);

  const handleVideoComponent = () => {
    setCreateOpen(true);
  };

  const createClose = () => {
    setCreateOpen(false); // 모달 닫기
  };

  return (
    <div>
      <h1>ChatRoomListPage</h1>
      <div>
        <button onClick={handleVideoComponent}>채팅방 생성</button>
      </div>
      {/* TODO : 생성 컴포넌트는 모달창으로 구현예정 */}
      <ChatRoomCreateComponent isOpen={createOpen} onClose={createClose} />
      <ChatRoomListComponent />
    </div>
  );
};

export default ChatRoomListPage;
