import styled from 'styled-components';

export const StyledMainContent = styled.div`
  padding: 1.2rem;
  background-color: #f8f9fa;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 1rem; /* 작은 화면에서는 패딩을 줄임 */
  }
`;
