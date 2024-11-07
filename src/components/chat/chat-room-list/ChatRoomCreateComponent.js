import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatRoomCreateAction from '../../../features/domains/chat/chat-room/actions/ChatRoomCreateAction';
import {
  StModalContent,
  StModalCreateButton,
  StModalCreateButtonLine,
  StModalExitButton,
  StModalExitButtonLine,
  StModalOverlay,
  StModalSelectContentLabel,
  StModalSelectContents,
  StModalTitle,
} from './styles/ChatRoomListModalStyles';
import { useNavigate } from 'react-router-dom';

const ChatRoomCreateComponent = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { newChatRoom } = useSelector((state) => state.chat.chatRoomList);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [chatType, setChatType] = useState('public'); // 기본값 설정
  const [isCreated, setIsCreated] = useState(false);

  console.log('newChatRoom : ' + newChatRoom);

  useEffect(() => {
    if (isCreated) {
      navigate(`/chats/chat-rooms/${newChatRoom}`);
    }
  }, [newChatRoom]);

  if (!isOpen) return null;

  const handleCreateButton = () => {
    dispatch(
      ChatRoomCreateAction({ bodyData: { name, description, chatType } })
    );
    setIsCreated(true);
  };

  return (
    <StModalOverlay>
      <StModalContent>
        <StModalExitButtonLine>
          <StModalExitButton onClick={onClose}>X</StModalExitButton>
        </StModalExitButtonLine>

        <StModalTitle>채팅방 생성</StModalTitle>
        <StModalSelectContents>
          <StModalSelectContentLabel>
            채팅방 이름:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </StModalSelectContentLabel>
          <StModalSelectContentLabel>
            설명:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </StModalSelectContentLabel>
          <StModalSelectContentLabel>
            채팅 타입:
            <select
              value={chatType}
              onChange={(e) => setChatType(e.target.value)}
            >
              <option value="one_to_one">1대1</option>
              <option value="private">비공개</option>
              <option value="public">공개</option>
            </select>
          </StModalSelectContentLabel>
        </StModalSelectContents>
        <StModalCreateButtonLine>
          <StModalCreateButton onClick={handleCreateButton}>
            생성
          </StModalCreateButton>
        </StModalCreateButtonLine>
      </StModalContent>
    </StModalOverlay>
  );
};

export default ChatRoomCreateComponent;
