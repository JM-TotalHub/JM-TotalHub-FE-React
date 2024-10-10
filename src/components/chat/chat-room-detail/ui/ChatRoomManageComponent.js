import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChatRoomDeleteAction from '../../../../features/domains/chat/chat-room/actions/ChatRoomDeleteAction';
import ChatRoomUpdateAction from '../../../../features/domains/chat/chat-room/actions/ChatRoomUpdateAction';

const ChatRoomManageComponent = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth.userInfo);
  const { chatRoomInfo, status } = useSelector(
    (state) => state.chat.chatRoomDetails
  );

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [chatType, setChatType] = useState('');

  useEffect(() => {
    if (status !== 'succeeded') return;
    setName(chatRoomInfo.name);
    setDescription(chatRoomInfo.description);
    setChatType(chatRoomInfo.chat_type);
  }, [chatRoomInfo]);

  if (!isOpen || status !== 'succeeded') return null;

  const handleDelete = () => {
    dispatch(
      ChatRoomDeleteAction({ chatRoomId: chatRoomInfo.id, userId: userInfo.id })
    )
      .then(() => {
        // 삭제 요청이 완료된 후에 페이지 이동 (현재 페이지 이동시 데이터 최신화 하기에 별도의 슬라이스 로직 안구현함)
        navigate('/chats/chat-rooms');
      })
      .catch((error) => {
        console.error('채팅방 삭제 중 오류 발생:', error);
      });
  };

  const handleUpdate = () => {
    dispatch(
      ChatRoomUpdateAction({
        chatRoomId: chatRoomInfo.id,
        bodyData: { name, description, chat_type: chatType },
      })
    )
      .then(() => {
        onClose(); // onClose를 호출
      })
      .catch((error) => {
        console.error('채팅방 수정 중 오류 발생:', error);
      });
  };

  return (
    <div>
      <h3>채팅방 관리 페이지</h3>
      <button onClick={onClose}>X</button>
      <div>
        <label>
          채팅방 이름:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
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
      </div>
      <button onClick={handleUpdate}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
};

export default ChatRoomManageComponent;
