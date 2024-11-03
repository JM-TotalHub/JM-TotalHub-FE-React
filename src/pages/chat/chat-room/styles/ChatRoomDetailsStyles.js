import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  /* flex-direction: column; */

  width: 100%;
  height: 100%;
`;

export const ContentContainer = styled.div`
  display: flex;

  width: 100%;
  height: 100%;

  justify-content: space-between;

  /* 화면이 작아질 때 세로 배치로 변경 */
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ChatSection = styled.div`
  display: flex;

  flex-direction: column;
  flex-basis: ${(props) => (props.useChatRoomVideo ? '30%' : '100%')};
  flex-shrink: 0;
  order: 2;

  transition: flex 0.5s ease;

  align-items: center;

  width: 100%;
  height: 100%;

  /* 화면이 작아질 때 VideoSection 아래로 배치되도록 순서 변경 */
  @media (max-width: 768px) {
    flex-basis: 100%;
  }
`;

export const VideoSection = styled.div`
  display: flex;
  flex-basis: ${(props) => (props.useChatRoomVideo ? '70%' : '0%')};
  flex-shrink: 0;
  order: 1;

  justify-content: center;
  align-items: center;

  transition: flex 0.5s ease;
  background-color: #f1f1f1;

  padding: 1rem;

  /* 화면이 작아질 때 차지하는 공간을 100%로 설정 */
  @media (max-width: 768px) {
    flex-basis: ${(props) => (props.useChatRoomVideo ? '100%' : '0%')};
  }
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
`;

export const ChatRoomMessageListContainer = styled.div`
  height: 65%;
  width: ${(props) => (props.useChatRoomVideo ? '100%' : '80%')};

  display: flex;
  flex-direction: column;
`;

export const ChatRoomMessageWriteContainer = styled.div`
  height: 15%;
  width: ${(props) => (props.useChatRoomVideo ? '100%' : '80%')};

  display: flex;
  flex-direction: column;
`;
