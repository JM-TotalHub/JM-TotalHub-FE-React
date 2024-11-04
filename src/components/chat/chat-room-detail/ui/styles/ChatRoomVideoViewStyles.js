import styled from 'styled-components';

export const StVideoContainer = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;

  background-color: rgb(50, 50, 50);
`;

// -----------------------------------------------------------

export const StMemberVideoContainer = styled.div`
  /* flex: 0 0 85%; */
  height: 85%;

  display: grid;
  ${({ membersCount }) => {
    if ((membersCount = 1)) {
      return `
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: 1fr;
      `;
    } else if ((membersCount = 2)) {
      return `
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 1fr;
      `;
    } else if (membersCount <= 4) {
      return `
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: 2fr;
      `;
    } else if (membersCount <= 6) {
      return `grid-template-columns: repeat(3, 1fr);`;
    } else {
      return `grid-template-columns: repeat(3, 1fr);`;
    }
  }}
  background-color: rgb(100, 100, 100);
`;

export const StMyVideoContainer = styled.div`
  /* flex: 0 0 15%; */
  height: 15%;

  display: flex;

  background-color: rgb(120, 120, 120);
`;

// -----------------------------------------------------------

export const StMemberVideoItem = styled.div`
  height: 10rem;
`;

export const StMemberVideo = styled.video``;

// -----------------------------------------------------------

export const StMyVideo = styled.video`
  object-fit: contain;
`;
