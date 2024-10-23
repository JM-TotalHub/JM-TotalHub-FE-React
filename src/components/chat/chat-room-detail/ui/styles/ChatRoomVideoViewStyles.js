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
  /* position: absolute; */

  display: flex;
  flex-wrap: wrap;

  justify-content: center;

  height: calc(100% - 20rem); // MyVideoContainer 높이를 제외한 나머지 영역 차지

  padding: 0.5rem;
`;

export const MemberVideoItem = styled.div`
  /* background-color: black; */
  ${({ membersCount }) => {
    if (membersCount === 1) {
      return `
        height: 100%;
        width: auto;
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
`;

// 스타일링된 Video 컴포넌트 생성
export const MemberVideo = styled.video`
  /* position: relative; // absolute에서 relative로 변경하여 컨테이너에 맞게 조정 */

  width: auto; // 너비를 부모 컨테이너에 맞춤
  height: 100%; // 높이도 부모 컨테이너에 맞춤

  object-fit: cover; // 비디오의 종횡비를 유지하면서 컨테이너에 맞춤

  background-color: black;
`;

export const MyVideoContainer = styled.div`
  position: absolute;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: start;

  width: 100%;
  height: 7rem;

  padding: 0.3rem;

  background-color: gray; // 배경색
`;

export const MyVideo = styled.video`
  height: 100%; // 높이 설정
  width: auto; // 너비 설정

  object-fit: cover;

  background-color: black; // 배경색 설정
`;
