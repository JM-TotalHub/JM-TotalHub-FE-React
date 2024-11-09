import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

// 상위 컨테이너 정의 (수직 배치)
export const StMainHeader = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 15vh;

  background-color: #526d82;
`;

// 로고 & 사용자 기능들의 컨테이너
export const StFirstLine = styled.div`
  flex: 6;
  height: 65%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 1rem;
`;

// 컨테츠 링크들의 컨테이너
export const StSecondLine = styled.div`
  flex: 4;
  height: 45%;

  display: flex;

  /* padding: 0 1rem; */

  justify-content: center;
  align-items: center;
`;

export const StLog = styled.div`
  margin-right: 1rem;

  @media ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: 1rem;
  }

  // 태블릿 화면에서 폰트 크기 변경
  @media ${({ theme }) => theme.mediaQueries.tablet} {
    font-size: 1.5rem;
  }

  // 데스크탑 화면에서 폰트 크기 변경
  @media ${({ theme }) => theme.mediaQueries.desktop} {
    font-size: 1.8rem;
  }
`;

export const StUserFunctions = styled.div`
  display: flex;

  align-items: center;
  gap: 0.5rem;
`;

export const StUserInfo = styled.div`
  // 모바일 화면에서 폰트 크기 변경
  @media ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: 1rem;
  }

  // 태블릿 화면에서 폰트 크기 변경
  @media ${({ theme }) => theme.mediaQueries.tablet} {
    font-size: 1.5rem;
  }

  // 데스크탑 화면에서 폰트 크기 변경
  @media ${({ theme }) => theme.mediaQueries.desktop} {
    font-size: 1.8rem;
  }
`;

export const StContentLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;

  flex: 1;
  height: 100%;
  width: 100%;

  text-align: center;
  font-size: 2rem;
  /* white-space: nowrap; */

  background-color: #9db2bf;
  border: #526d82 solid 0.1rem;
  border-radius: 0.5rem;

  // 모바일 화면에서 폰트 크기 변경
  @media ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: 1.2rem;
  }

  // 태블릿 화면에서 폰트 크기 변경
  @media ${({ theme }) => theme.mediaQueries.tablet} {
    font-size: 1.8rem;
  }

  // 데스크탑 화면에서 폰트 크기 변경
  @media ${({ theme }) => theme.mediaQueries.desktop} {
    font-size: 2rem;
  }
`;

// =========================================================
// 공통 버튼 스타일 정의
const ButtonBase = css`
  background-color: #9db2bf;

  border: none;
  border-radius: 1rem;
  padding: 0.5rem 1rem;

  color: #ffffff;
  font-size: 1rem;

  cursor: pointer;
  transition: background-color 0.3s;

  // 모바일 화면에서 폰트 크기 변경
  @media ${({ theme }) => theme.mediaQueries.mobile} {
    font-size: 0.8rem;
  }

  // 태블릿 화면에서 폰트 크기 변경
  @media ${({ theme }) => theme.mediaQueries.tablet} {
    font-size: 1rem;
  }

  // 데스크탑 화면에서 폰트 크기 변경
  @media ${({ theme }) => theme.mediaQueries.desktop} {
    font-size: 1.3rem;
  }
`;

export const AuthButton = styled.button`
  ${ButtonBase}
`;

export const AuthLink = styled(Link)`
  ${ButtonBase}
  text-decoration: none;
  display: inline-block;
`;
