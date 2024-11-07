import styled from 'styled-components';

export const StChatRoomListContainer = styled.div`
  padding: 0.2rem;
  box-sizing: border-box;

  overflow-y: auto;
  max-height: 80vh;

  border: 0.3rem solid blanchedalmond;

  display: grid;
  grid-template-rows: auto;
  ${({ device }) => {
    if (device === 'desktop') {
      return `
        grid-template-columns: repeat(3, 1fr); /* 데스크탑: 3개의 열 */
      `;
    } else if (device === 'tablet') {
      return `
        grid-template-columns: repeat(2, 1fr); /* 태블릿: 2개의 열 */
      `;
    } else if (device === 'mobile') {
      return `
        grid-template-columns: 1fr; /* 모바일: 1개의 열 */
      `;
    } else {
      return `
        grid-template-columns: 1fr; /* 기본: 1개의 열 */
      `;
    }
  }}
`;

export const StChatRoomItem = styled.div`
  display: flex;
  flex-direction: column;

  border: 0.1rem solid blueviolet;
`;
