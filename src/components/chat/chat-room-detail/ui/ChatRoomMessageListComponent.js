import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatRoomMessageLoadAction from '../../../../features/domains/chat/chat-room/actions/ChatRoomMessageLoadAction';

const ChatRoomMessageListComponent = ({ chatRoomId }) => {
  const { chatRoomMessages, status, error } = useSelector(
    (state) => state.chat.chatRoomDetails
  );

  const dispatch = useDispatch();
  const messageListRef = useRef(null);
  const [isFetching, setIsFetching] = useState(false); // 추가 데이터 로딩 상태
  const [lastMessage, setLastMessage] = useState(false);
  const [initScroll, setInitScroll] = useState(true);

  console.log('@@@@@@@ ChatRoomMessageListComponent 재랜더링');

  useEffect(() => {
    // 처음 렌더링 시 스크롤을 가장 아래로 이동
    if (messageListRef.current && initScroll) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [chatRoomMessages]);

  useEffect(() => {
    const handleScroll = () => {
      // 일단 스크롤 움직이면 이제 끝 고정 풀기
      setInitScroll(false);

      if (
        messageListRef.current.scrollTop === 0 &&
        !isFetching &&
        !lastMessage
      ) {
        // 스크롤이 맨 위에 도달하고 현재 데이터를 로드 중이 아닐 때
        setIsFetching(true);

        dispatch(
          ChatRoomMessageLoadAction({
            chatRoomId,
            lastMessageId: chatRoomMessages[0].message_id,
            messageNum: 30,
          })
        ) // 메시지 추가 요청
          .then(() => setIsFetching(false)) // 요청이 완료되면 다시 로딩 상태 해제
          .catch(() => setIsFetching(false));

        messageListRef.current.scrollTop = 1;
      }
    };

    const messageList = messageListRef.current;

    if (messageList) {
      messageList.addEventListener('scroll', handleScroll);
    }

    if (chatRoomMessages[0] === 'end') {
      setLastMessage(true);
    }

    return () => {
      if (messageList) {
        messageList.removeEventListener('scroll', handleScroll);
      }
    };
  }, [chatRoomMessages, isFetching]);

  if (status === 'error') {
    return <div>Loading... 데이터를 요청실패.</div>;
  }

  if (status === 'idle') {
    return <div>로딩 중입니다...</div>;
  }

  if (status === 'succeeded') {
    console.log('현재 채팅 메시지 데이터 : ', chatRoomMessages);

    return (
      <div>
        <h2>채팅 메시지</h2>
        <div
          ref={messageListRef}
          style={{ height: '400px', overflowY: 'scroll' }}
        >
          {lastMessage && (
            <div style={{ color: 'red' }}>마지막 메시지입니다</div>
          )}{' '}
          {chatRoomMessages.map((messageData, index) => (
            <div key={index}>
              <div
                dangerouslySetInnerHTML={{ __html: messageData.content }}
              ></div>
            </div>
          ))}
          {isFetching && <div>이전 메시지 불러오는 중...</div>}
        </div>
      </div>
    );
  }
};

export default ChatRoomMessageListComponent;
