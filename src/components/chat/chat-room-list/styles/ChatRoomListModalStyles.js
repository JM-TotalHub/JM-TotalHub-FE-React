import styled from 'styled-components';

export const StModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
`;

export const StModalContent = styled.div`
  padding: 1rem;

  border-radius: 1rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);

  width: 30rem; /* 원하는 너비 설정 */
  max-width: 90%; /* 반응형을 위해 최대 너비 설정 */

  background: white;
`;

export const StModalExitButtonLine = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
`;
export const StModalExitButton = styled.button``;

export const StModalCreateButtonLine = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
`;
export const StModalCreateButton = styled.button``;

export const StModalTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

export const StModalSelectContents = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0.2rem;
`;

export const StModalSelectContentLabel = styled.label`
  display: flex;
  flex-direction: column;

  padding: 0.2rem;
`;
