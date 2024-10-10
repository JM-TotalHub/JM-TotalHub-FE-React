import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import ChatRoomCreateAction from '../../../features/domains/chat/chat-room/actions/ChatRoomCreateAction';

const ChatRoomCreateComponent = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [chatType, setChatType] = useState('public'); // 기본값 설정

  if (!isOpen) return null;

  const handleCreateButton = () => {
    dispatch(
      ChatRoomCreateAction({ bodyData: { name, description, chatType } })
    );
  };

  return (
    <div className="chatroom-create-modal-overlay">
      <div className="chatroom-create-modal-content">
        <button onClick={onClose}>X</button>
        <h2>채팅방 생성</h2>
        <label>
          채팅방 이름:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          설명:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          채팅 타입:
          <select
            value={chatType}
            onChange={(e) => setChatType(e.target.value)}
          >
            <option value="one_to_one">1대1</option>
            <option value="private">비공개</option>
            <option value="public">공개</option>
          </select>
        </label>
        <button onClick={handleCreateButton}>생성</button>
      </div>
    </div>
  );
};

export default ChatRoomCreateComponent;
