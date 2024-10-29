import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatRoomMessageLoadAction from '../../../../features/domains/chat/chat-room/actions/ChatRoomMessageLoadAction';
import { ChatRoomMessageListContainer } from '../../../../pages/chat/chat-room/styles/ChatRoomDetailsStyles';

const ChatRoomMessageListComponent = ({ chatRoomId, useChatRoomVideo }) => {
  const { userInfo } = useSelector((state) => state.auth.userInfo);
  const { chatRoomMessages, status, newMessage } = useSelector(
    (state) => state.chat.chatRoomDetails
  );

  const dispatch = useDispatch();
  const messageListRef = useRef(null);
  const [isFetching, setIsFetching] = useState(false); // 추가 데이터 로딩 상태
  const [lastMessage, setLastMessage] = useState(false);

  useEffect(() => {
    // newMessage 상태값으로 (첫입장 || 나의 새로운 메시지)일때 스크롤 가장 아래로
    if (
      messageListRef.current &&
      (newMessage === userInfo.id || newMessage === 'init')
    ) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [chatRoomMessages]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        messageListRef.current.scrollTop === 0 &&
        !isFetching &&
        !lastMessage
      ) {
        // 지속적인 스크롤 + 메시지 추가요청 방지
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

    // 스크롤 이벤트
    if (messageList) {
      messageList.addEventListener('scroll', handleScroll);
    }

    // 채팅방의 마지막(최초) 메시지까지 로드 완료
    if (chatRoomMessages[0] === 'end') {
      setLastMessage(true);
    }

    return () => {
      // 스크롤 이벤트 해제
      if (messageList) {
        messageList.removeEventListener('scroll', handleScroll);
      }
    };
  }, [chatRoomMessages, isFetching]);

  if (status === 'error') {
    return <div>Loading... 데이터를 요청실패.</div>;
  }

  if (status === 'idle') {
    return <div>메시지를 불러오고 있습니다...</div>;
  }

  if (status === 'succeeded') {
    return (
      <ChatRoomMessageListContainer useChatRoomVideo={useChatRoomVideo}>
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
      </ChatRoomMessageListContainer>
    );
  }
};

export default ChatRoomMessageListComponent;
