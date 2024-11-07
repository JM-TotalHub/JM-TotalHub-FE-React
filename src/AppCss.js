import styled from 'styled-components';

export const StyledAppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StyledHeaderContent = styled.div`
  height: 15vh;
  /* width: 100%; */
  order: 1;
`;

export const StyledMainContent = styled.div`
  height: 85vh;
  /* width: 100%; */
  order: 2;

  box-sizing: border-box;
`;
