import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ChatRoomEmitterHandler from '../../../../utils/connections/socket-handler/chat-room/ChatRoomEmitterHandler';
import QuillEditor from '../../../common/QuillEditor';

const ChatRoomMessageWriteFormComponent = ({ chatRoomId }) => {
  const { status, error } = useSelector((state) => state.chat.chatRoomDetails);

  console.log('ChatRoomMessageWriteFormComponent에서 채팅방 id : ', chatRoomId);

  const { sendMessage } = ChatRoomEmitterHandler(chatRoomId); // 훅 호출

  const [content, setContent] = useState('');

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // 기본 폼 제출 이벤트 방지

    if (content.trim()) {
      // 비어있는 메시지 전송 방지
      sendMessage(chatRoomId, content); // 채팅방 ID와 메시지를 전송
      setContent(''); // 메시지 전송 후 내용 초기화
    }
  };

  if (status === 'error') {
    return <div>Loading... 데이터를 요청실패.</div>;
  }

  if (status === 'idle') {
    return <div>로딩 중입니다...</div>;
  }

  if (status === 'succeeded') {
    return (
      <div>
        <h3>채팅 작성 폼</h3>
        <form onSubmit={handleSubmit}>
          <QuillEditor
            value={content}
            onChange={handleContentChange}
            modules={{ toolbar: false }}
            style={{ hight: '5rem' }}
          />
          <button type="submit">전송</button>
        </form>
      </div>
    );
  }
};

export default ChatRoomMessageWriteFormComponent;
