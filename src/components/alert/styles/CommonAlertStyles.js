import styled from 'styled-components';

export const AlertContainer = styled.div`
  display: ${({ show }) => (show ? 'block' : 'none')};
  z-index: 1000;
  transition: opacity 0.5s ease-in-out;
  opacity: ${({ show }) => (show ? 1 : 0)};

  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%); /* 중앙에 배치 */
  padding: 16px;
  border-radius: 4px;
  background-color: #a9a9a9;
  color: white;
  max-width: 400px; /* 최대 너비 설정 */
  text-align: center; /* 기본 텍스트 중앙 정렬 */
`;

export const AlertMessage = styled.p`
  margin: 0;
  text-align: center;
  font-size: 1.5rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center; /* 버튼들을 중앙에 배치 */
  margin-top: 10px;

  /* 버튼 간의 간격을 조절 */
  & > *:not(:last-child) {
    margin-right: 15px; /* 마지막 버튼을 제외하고 오른쪽에 여백 */
  }
`;

export const AlertLink = styled.a`
  color: #ffffff;
  text-decoration: underline;
  cursor: pointer;
  font-size: 1rem;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  text-decoration: underline;
  &:hover {
    opacity: 0.8;
  }
`;
