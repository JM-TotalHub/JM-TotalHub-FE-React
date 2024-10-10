import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChatRoomDetailsLoadComponent from '../../../components/chat/chat-room-detail/logic/ChatRoomDetailsLoadComponent';
import { ChatRoomVideoContext } from '../../../components/chat/chat-room-detail/logic/ChatRoomVideoContext';
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
import ChatRoomVideoLoadComponent from '../../../components/chat/chat-room-detail/logic/ChatRoomVideoLoadComponent';
import ChatRoomManageComponent from '../../../components/chat/chat-room-detail/ui/ChatRoomManageComponent';

const ChatRoomDetailsPage = () => {
  const dispatch = useDispatch();

  const { chatRoomId } = useParams();

  const { userInfo } = useSelector((state) => state.auth.userInfo);
  const { useChatRoomVideo, localStreamReady, chatRoomVideoDataReady } =
    useSelector((state) => state.chat.chatRoomVideoStatus);

  const { chatRoomInfo } = useSelector((state) => state.chat.chatRoomDetails);

  const [manageOpen, setManageOpen] = useState(false);

  const handleManageComponent = () => {
    setManageOpen(true);
  };

  const ManageClose = () => {
    setManageOpen(false);
  };

  const handleVideoComponent = () => {
    if (useChatRoomVideo) {
      dispatch(offChatRoomVideo());
    } else {
      dispatch(onChatRoomVideo());
    }
  };

  console.log(
    '채팅방 user_id : ',
    chatRoomInfo.user_id,
    'userInfo.id : ',
    userInfo.id
  );

  return (
    <div>
      <h1>ChatRoomDetailsPage</h1>

      {/* 채팅방 기본 정보 로드 컴포넌트 적용 */}
      <ChatRoomDetailsLoadComponent chatRoomId={chatRoomId} />

      {/* 채팅방 수정 & 삭제 모달 컴포넌트 - 모달로 구현*/}
      <div>
        {Number(chatRoomInfo.user_id) === userInfo.id && (
          <button onClick={handleManageComponent}>채팅방 관리</button>
        )}
        <ChatRoomManageComponent isOpen={manageOpen} onClose={ManageClose} />
      </div>

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
          <ChatRoomVideoListenerHandler chatRoomId={chatRoomId} />
          {localStreamReady && chatRoomVideoDataReady && (
            <>
              <ChatRoomVideoLoadComponent chatRoomId={chatRoomId} />
              <ChatRoomVideoViewComponent chatRoomId={chatRoomId} />
            </>
          )}
        </ChatRoomVideoContext>
      )}
    </div>
  );
};

export default ChatRoomDetailsPage;
