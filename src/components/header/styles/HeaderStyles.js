import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

// 상위 컨테이너 정의 (수직 배치)
export const MainHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column; /* 수직으로 배치 */
  align-items: flex-start; /* 왼쪽 정렬 */
  width: 100%;
  background-color: #5f9ea0; /* 전체 배경색을 헤더와 통일 */
  /* padding: 1rem; */
`;

// Header 스타일 정의
export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  width: 95%;
  background-color: #5f9ea0;
  justify-content: flex-end;
`;

// 사용자 정보 스타일 정의
export const UserInfo = styled.h4`
  margin: 0; /* 기본 여백 제거 */
  margin-right: 10px; /* 오른쪽 여백 추가 */
  font-size: 1.6rem;
`;

// 공통 버튼 스타일 정의
const ButtonBase = css`
  background-color: #007bff; /* 버튼 배경색 */
  color: white; /* 글자 색상 */
  padding: 10px 15px; /* 안쪽 여백 */
  border: none; /* 테두리 없애기 */
  border-radius: 5px; /* 모서리 둥글게 */
  cursor: pointer; /* 커서 모양 변경 */
  margin: 0 5px; /* 여백 추가 */
  font-size: 16px; /* 글자 크기 */
  transition: background-color 0.3s; /* 배경색 변화에 애니메이션 추가 */

  &:hover {
    background-color: #0056b3; /* 마우스 오버 시 배경색 변화 */
  }
`;

// AuthButton에 공통 스타일 적용
export const AuthButton = styled.button`
  ${ButtonBase}/* 공통 스타일 상속 */
`;

// AuthLink에 공통 스타일 적용
export const AuthLink = styled(Link)`
  ${ButtonBase} /* 공통 스타일 상속 */
  text-decoration: none; /* 링크 밑줄 없애기 */
  display: inline-block; /* 링크를 블록으로 취급 */
`;

// 수정된 부분: 네비게이션 링크들을 한 줄로 표시할 컨테이너
export const NavLinksContainer = styled.div`
  display: flex;
  align-items: center;
  margin: auto;
  margin-left: 2rem;
`;

// 수정된 부분: 네비게이션 링크 항목 스타일 정의
export const NavLinkItem = styled(Link)`
  margin: 0 1rem;
  font-size: 1.2rem;
  text-decoration: none;
  color: white;

  &:hover {
    color: #eaeaea;
  }
`;
