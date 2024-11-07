import styled from 'styled-components';

export const PageContainer = styled.div``;

export const ContentContainer = styled.div`
  display: flex;

  height: 85vh;
  width: 100%;

  padding: 0.5rem;
  box-sizing: border-box;

  /* 화면이 작아질 때 세로 배치로 변경 - 일단 임의로 1000 */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ChatSection = styled.div`
  flex: ${(props) => (props.useChatRoomVideo ? 3 : 10)};
  order: 2;

  transition: flex 0.5s ease;

  width: ${(props) => (props.useChatRoomVideo ? '30%' : '100%')};
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;

  padding: 0 0.3rem;

  /* 화면이 작아질 때 VideoSection 아래로 배치되도록 순서 변경 */
  @media (max-width: 768px) {
    flex: 10;
    width: 100%;
    height: 100vh;
    padding: 0;
  }
`;

export const VideoSection = styled.div`
  flex: ${(props) => (props.useChatRoomVideo ? 7 : 0)};
  order: 1;

  transition: flex 0.5s ease;

  width: ${(props) => (props.useChatRoomVideo ? '70%' : '0%')};
  height: 100%;

  display: flex;

  background-color: #f1f1f1;

  /* 화면이 작아질 때 차지하는 공간을 100%로 설정 */
  @media (max-width: 768px) {
    flex: ${(props) => (props.useChatRoomVideo ? 10 : 0)};
    width: 100%;
    height: 50%;
  }
`;

export const StChatFunctionButton = styled.div`
  height: 8%;
  width: ${(props) => (props.useChatRoomVideo ? '100%' : '80%')};
`;

export const ChatRoomInfoContainer = styled.div`
  height: 0%;
  width: ${(props) => (props.useChatRoomVideo ? '100%' : '80%')};

  display: flex;
`;

export const ChatRoomMemberContainer = styled.div`
  height: 20%;
  width: ${(props) => (props.useChatRoomVideo ? '100%' : '80%')};

  display: flex;
  flex-direction: column;
`;

export const StChatRoomMember = styled.div`
  width: 100%;

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
