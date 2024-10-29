import styled from 'styled-components';
// import styled from 'styled-components/macro';

export const VideoContainer = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  /* align-items: center; */

  height: 100%;
  width: 100%;
`;

export const MemberVideoContainer = styled.div`
  position: relative;

  display: grid;
  gap: 1rem;

  align-items: center;
  justify-content: center;

  height: 85%;
  width: 100%;

  ${({ membersCount }) => {
    if ((membersCount = 1)) {
      return `
        grid-template-columns: 1fr; // 1줄에 2개
              `;
    } else if ((membersCount = 2)) {
      return `
        grid-template-columns: repeat(2, 1fr); // 2줄에 2개씩
      `;
    } else if (membersCount <= 4) {
      return `
        grid-template-columns: repeat(2, 1fr); // 2줄에 2개씩
      `;
    } else if (membersCount <= 6) {
      return `
        grid-template-columns: repeat(3, 1fr); // 2줄에 3개씩
      `;
    } else {
      return `
        grid-template-columns: repeat(3, 1fr); // 3줄에 3개씩
      `;
    }
  }}
`;

export const MyVideoContainer = styled.div`
  position: relative;
  bottom: 0;

  display: flex;

  height: 15%;
  width: 100%;

  padding: 0.3rem;

  background-color: gray; // 배경색

  justify-content: start;
`;

export const MemberVideoItem = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
`;

// 스타일링된 Video 컴포넌트 생성
export const MemberVideo = styled.video`
  /* flex-wrap: wrap; */

  height: 100%; // 높이도 부모 컨테이너에 맞춤
  width: 100%;

  background-color: black;
`;

export const MyVideo = styled.video`
  height: 100%; // 높이 설정
  width: auto; // 너비 설정

  object-fit: cover;

  background-color: black; // 배경색 설정
`;
