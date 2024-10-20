import styled from 'styled-components';

// styled-components 스타일 정의
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  /* max-width: 1200px; */
  justify-content: space-between;
`;

export const ChatSection = styled.div`
  display: flex;
  flex-basis: ${(props) =>
    props.useChatRoomVideo ? '30%' : '100%'}; /* 30% 고정 */
  order: 2;
  flex-shrink: 0;

  flex-direction: column;
  transition: flex 0.5s ease;
`;

export const VideoSection = styled.div`
  display: flex;
  flex-basis: ${(props) =>
    props.useChatRoomVideo ? '70%' : '0%'}; /* 30% 고정 */
  flex-shrink: 0;

  order: 1;

  justify-content: center;
  align-items: center;

  transition: flex 0.5s ease;
  background-color: #f1f1f1;
  padding: 20px;
  border-radius: 8px;
`;
