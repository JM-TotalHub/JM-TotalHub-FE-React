import styled from 'styled-components';

export const VideoContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
`;

// 전체 비디오 레이아웃을 위한 styled component (플렉스 박스 적용)
export const MemberVideoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  justify-content: center;

  padding: 0.5rem;
`;

export const MemberVideoItem = styled.div`
  /* background-color: black; */
  ${({ membersCount }) => {
    if (membersCount === 1) {
      return `
        width: 100%;
      `;
    } else if (membersCount === 2) {
      return `
        flex: 1 1 50%;
      `;
    } else if (membersCount === 3) {
      return `
        flex: 1 1 50%;  // 2명의 비디오가 가로로 50%씩 차지
        &:nth-child(3) {
          flex-basis: 100%;  // 3번째 비디오는 다음 줄에 중앙에 배치
          display: flex;
          justify-content: center;
        }
      `;
    } else {
      return `flex: 1 1 33.33%;`;
    }
  }}

  position: relative;
  flex-direction: column;

  height: 100%;
`;

// export const MemberVideoItem = styled.div`
//   height: 100%;
//   width: auto;
// `;

// 스타일링된 Video 컴포넌트 생성
export const MemberVideo = styled.video`
  position: absolute;

  height: 100%; // 높이 설정
  width: auto; // 너비 설정

  background-color: black; // 배경색 설정
`;

// 본인 비디오를 왼쪽 하단에 고정시키는 styled component
export const MyVideoContainer = styled.div`
  position: absolute;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: start;

  width: 100%;
  height: 10rem;

  padding: 0.3rem;

  background-color: gray; // 배경색
`;

export const MyVideo = styled.video`
  height: 100%; // 높이 설정
  width: auto; // 너비 설정

  background-color: black; // 배경색 설정
`;
