import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import QuillEditor from '../../common/QuillEditor';

const ChatRoomMessageWriteFormComponent = () => {
  const { chatRoomDetails, status, error } = useSelector(
    (state) => state.chat.chatRoomDetails
  );

  const [content, setContent] = useState('');

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleSubmit = () => {};

  if (status === 'error') {
    return <div>Loading... 데이터를 요청실패.</div>;
  }

  if (status === 'idle') {
    return <div>로딩 중입니다...</div>;
  }

  if (status === 'succeeded') {
    const { chatRoomInfo, chatRoomMembers, chatRoomMessages } = chatRoomDetails;

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
