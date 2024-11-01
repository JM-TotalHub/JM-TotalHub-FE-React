import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

// 상위 컨테이너 정의 (수직 배치)
export const StMainHeader = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  background-color: #526d82;
`;

// 로고 & 사용자 기능들의 컨테이너
export const StFirstLine = styled.div`
  flex: 4;

  display: flex;
  justify-content: space-between;

  padding: 0 1rem;
`;

// 컨테츠 링크들의 컨테이너
export const StSecondLine = styled.div`
  flex: 3;

  display: flex;

  /* padding: 0 1rem; */

  justify-content: center;
  align-items: center;
`;

export const StLog = styled.div``;

export const StUserFunctions = styled.div`
  display: flex;

  align-items: center;
  gap: 0.5rem;
`;

export const StUserInfo = styled.div``;

export const StContentLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  flex: 1;
  height: 100%;
  width: 100%;

  text-align: center;
  font-size: 2rem;

  @media screen {
    font-size: 1.2rem;
  }
`;

// =========================================================
// 공통 버튼 스타일 정의
const ButtonBase = css``;

export const AuthButton = styled.button`
  /* ${ButtonBase} */
`;

export const AuthLink = styled(Link)`
  /* ${ButtonBase} 
  text-decoration: none; 
  display: inline-block; */
`;
