import styled from 'styled-components';

export const StyledAppContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
`;

export const StyledHeaderContent = styled.div`
  flex-basis: 15%;
`;

export const StyledMainContent = styled.div`
  padding: 1.2rem;
  box-sizing: border-box;

  flex-basis: 85%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
