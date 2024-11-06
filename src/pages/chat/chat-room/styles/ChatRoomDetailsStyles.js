import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;

  width: 100%;
  height: 100%;
`;

export const ContentContainer = styled.div`
  display: flex;

  width: 100%;
  height: 100%;

  /* 화면이 작아질 때 세로 배치로 변경 - 일단 임의로 1000 */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ChatSection = styled.div`
  flex: ${(props) => (props.useChatRoomVideo ? 3 : 10)};
  order: 2;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;

  transition: flex 0.5s ease;

  width: 100%;
  height: 100%;

  padding: 0 0.3rem;

  /* 화면이 작아질 때 VideoSection 아래로 배치되도록 순서 변경 */
  @media (max-width: 768px) {
    flex: 10;
  }
`;

export const VideoSection = styled.div`
  flex: ${(props) => (props.useChatRoomVideo ? 7 : 0)};
  order: 1;

  display: flex;

  transition: flex 0.5s ease;
  background-color: #f1f1f1;

  /* 화면이 작아질 때 차지하는 공간을 100%로 설정 */
  @media (max-width: 768px) {
    flex: ${(props) => (props.useChatRoomVideo ? 10 : 0)};
  }
`;

export const StChatFunctionButton = styled.div`
  height: 15%;
  width: ${(props) => (props.useChatRoomVideo ? '100%' : '80%')};
`;

export const ChatRoomInfoContainer = styled.div`
  height: 0%;
  width: ${(props) => (props.useChatRoomVideo ? '100%' : '80%')};

  display: flex;
`;

export const ChatRoomMemberContainer = styled.div`
  height: 15%;
  width: ${(props) => (props.useChatRoomVideo ? '100%' : '80%')};

  display: flex;
`;

export const StChatRoomMember = styled.div`
  max-height: 100%;
  overflow-y: auto;
  white-space: nowrap;
`;

export const ChatRoomMessageListContainer = styled.div`
  height: 65%;
  width: ${(props) => (props.useChatRoomVideo ? '100%' : '80%')};

  display: flex;
  flex-direction: column;
`;

export const ChatRoomMessageWriteContainer = styled.div`
  height: 10%;
  width: ${(props) => (props.useChatRoomVideo ? '100%' : '80%')};

  display: flex;
  flex-direction: column;
`;
