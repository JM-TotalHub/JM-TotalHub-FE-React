import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChatRoomDetailsLoadComponent from '../../../components/chat/chat-room-detail/logic/ChatRoomDetailsLoadComponent';
import { ChatRoomVideoContext } from '../../../components/chat/chat-room-detail/logic/ChatRoomVideoContext';
import ChatRoomVideoLoadComponent from '../../../components/chat/chat-room-detail/logic/ChatRoomVideoLoadComponent';
import ChatRoomInfoComponent from '../../../components/chat/chat-room-detail/ui/ChatRoomInfoComponent';
import ChatRoomManageComponent from '../../../components/chat/chat-room-detail/ui/ChatRoomManageComponent';
import ChatRoomMemberComponent from '../../../components/chat/chat-room-detail/ui/ChatRoomMemberComponent';
import ChatRoomMessageListComponent from '../../../components/chat/chat-room-detail/ui/ChatRoomMessageListComponent';
import ChatRoomMessageWriteComponent from '../../../components/chat/chat-room-detail/ui/ChatRoomMessageWriteComponent';
import ChatRoomVideoViewComponent from '../../../components/chat/chat-room-detail/ui/ChatRoomVideoViewComponent';
import {
  offChatRoomVideo,
  onChatRoomVideo,
} from '../../../features/domains/chat/chat-room/slices/ChatRoomVideoStatusSlice';
import ChatRoomVideoListenerHandler from '../../../utils/connections/socket-handler/chat-room/ChatRoomVideoListenerHandler';
import {
  ChatSection,
  ContentContainer,
  PageContainer,
  StChatFunctionButton,
  VideoSection,
} from './styles/ChatRoomDetailsStyles';

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

  return (
    <PageContainer>
      {/* 채팅방 기본 정보 로드 컴포넌트 적용 */}
      <ChatRoomDetailsLoadComponent chatRoomId={chatRoomId} />

      <ContentContainer useChatRoomVideo={useChatRoomVideo}>
        {/* 채팅 UI 컴포넌트 적용 - 이 컴포넌트 나중에 memo 적용하기 */}
        <ChatSection useChatRoomVideo={useChatRoomVideo}>
          <StChatFunctionButton useChatRoomVideo={useChatRoomVideo}>
            <div>
              <button onClick={handleVideoComponent}>화상채팅</button>
            </div>
            <div>
              {Number(chatRoomInfo.user_id) === userInfo.id && (
                <button onClick={handleManageComponent}>채팅방 관리</button>
              )}
              <ChatRoomManageComponent
                isOpen={manageOpen}
                onClose={ManageClose}
              />
            </div>
          </StChatFunctionButton>

          <ChatRoomInfoComponent
            chatRoomId={chatRoomId}
            useChatRoomVideo={useChatRoomVideo}
          />
          <ChatRoomMemberComponent
            chatRoomId={chatRoomId}
            useChatRoomVideo={useChatRoomVideo}
          />
          <ChatRoomMessageListComponent
            chatRoomId={chatRoomId}
            useChatRoomVideo={useChatRoomVideo}
          />
          <ChatRoomMessageWriteComponent
            chatRoomId={chatRoomId}
            useChatRoomVideo={useChatRoomVideo}
          />
        </ChatSection>

        {/* 화상채팅 */}
        {useChatRoomVideo && (
          <VideoSection useChatRoomVideo={useChatRoomVideo}>
            <ChatRoomVideoContext chatRoomId={chatRoomId}>
              <ChatRoomVideoListenerHandler chatRoomId={chatRoomId} />
              {localStreamReady && chatRoomVideoDataReady && (
                <>
                  <ChatRoomVideoLoadComponent chatRoomId={chatRoomId} />
                  <ChatRoomVideoViewComponent chatRoomId={chatRoomId} />
                </>
              )}
            </ChatRoomVideoContext>
          </VideoSection>
        )}
      </ContentContainer>
    </PageContainer>
  );
};

export default ChatRoomDetailsPage;
