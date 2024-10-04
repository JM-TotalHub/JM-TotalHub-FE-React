import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import chatRoomListByNothing from '../../../features/domains/chat/chat-room/actions/ChatRoomListAction';
import { useNavigate } from 'react-router-dom';

const ChatRoomListComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { chatRoomList, status, error } = useSelector(
    (state) => state.chat.chatRoomList
  );

  useEffect(() => {
    dispatch(chatRoomListByNothing());
  }, []);

  if (status === 'failed') {
    console.log('api 통신 에러 : ' + error);
    return <div>Error: 채팅방 데이터를 불러오지 못했습니다.</div>;
  }

  const handleChatRoomClick = (chatRoomId) => {
    navigate(`/chats/chat-rooms/${chatRoomId}`);
  };

  return (
    <div>
      <ul>
        {chatRoomList.map((chatRoom) => (
          <li
            key={chatRoom.id}
            onClick={() => handleChatRoomClick(chatRoom.id)}
          >
            <p>{chatRoom.id}</p>
            <h3>{chatRoom.name}</h3>
            <p>{chatRoom.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatRoomListComponent;
