import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChatRoomDetailsLoadComponent from '../../../components/chat/chat-room-detail/logic/ChatRoomDetailsLoadComponent';
import { ChatRoomVideoContext } from '../../../components/chat/chat-room-detail/logic/ChatRoomVideoContext';
import ChatRoomVideoLoadComponent from '../../../components/chat/chat-room-detail/logic/ChatRoomVideoLoadComponent';
import ChatRoomInfoComponent from '../../../components/chat/chat-room-detail/ui/ChatRoomInfoComponent';
import ChatRoomMemberComponent from '../../../components/chat/chat-room-detail/ui/ChatRoomMemberComponent';
import ChatRoomMessageListComponent from '../../../components/chat/chat-room-detail/ui/ChatRoomMessageListComponent';
import ChatRoomMessageWriteComponent from '../../../components/chat/chat-room-detail/ui/ChatRoomMessageWriteComponent';
import ChatRoomVideoViewComponent from '../../../components/chat/chat-room-detail/ui/ChatRoomVideoViewComponent';
import {
  offChatRoomVideo,
  onChatRoomVideo,
} from '../../../features/domains/chat/chat-room/slices/ChatRoomVideoStatusSlice';
import ChatRoomVideoListenerHandler from '../../../utils/connections/socket-handler/chat-room/ChatRoomVideoListenerHandler';

const ChatRoomDetailsPage = () => {
  const { chatRoomId } = useParams();

  const dispatch = useDispatch();
  const { useChatRoomVideo } = useSelector(
    (state) => state.chat.chatRoomVideoStatus
  );

  const handleVideoComponent = () => {
    if (useChatRoomVideo) {
      dispatch(offChatRoomVideo());
    } else {
      dispatch(onChatRoomVideo());
    }
  };

  return (
    <div>
      <h1>ChatRoomDetailsPage</h1>

      {/* 채팅 기능 컴포넌트 적용 */}
      <ChatRoomDetailsLoadComponent chatRoomId={chatRoomId} />

      {/* 채팅 UI 컴포넌트 적용 - 이 컴포넌트 나중에 memo 적용하기 */}
      <ChatRoomInfoComponent chatRoomId={chatRoomId} />
      <ChatRoomMemberComponent chatRoomId={chatRoomId} />
      <ChatRoomMessageListComponent chatRoomId={chatRoomId} />
      <ChatRoomMessageWriteComponent chatRoomId={chatRoomId} />

      {/* 화상채팅 활성화 버튼 */}
      <div>
        <button onClick={handleVideoComponent}>화상채팅</button>
      </div>

      {useChatRoomVideo && (
        <ChatRoomVideoContext chatRoomId={chatRoomId}>
          <ChatRoomVideoLoadComponent chatRoomId={chatRoomId} />
          <ChatRoomVideoListenerHandler chatRoomId={chatRoomId} />
          <ChatRoomVideoViewComponent chatRoomId={chatRoomId} />
        </ChatRoomVideoContext>
      )}
    </div>
  );
};

export default ChatRoomDetailsPage;
