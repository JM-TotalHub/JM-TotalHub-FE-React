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
  flex: 85;
  height: 85%;
  width: 100%;

  order: 1;

  display: grid;
  ${({ membersCount }) => {
    if (membersCount === 1) {
      return `
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
    `;
    } else if (membersCount === 2) {
      return `
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 1fr;
    `;
    } else if (membersCount <= 4) {
      return `
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
    `;
    } else if (membersCount <= 6) {
      return `
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
    `;
    } else {
      return `
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(auto-fill, 1fr);
    `;
    }
  }}

  transition: all 0.3s ease;

  background-color: rgb(100, 100, 100);
`;

export const StMyVideoContainer = styled.div`
  flex: 15;
  order: 2;

  height: 15%;

  display: flex;

  background-color: rgb(120, 120, 120);
`;

// -----------------------------------------------------------

export const StMemberVideoItem = styled.div`
  width: 100%;
  height: 100%;

  padding: 1rem;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  background-color: rgb(150, 150, 150);
`;

export const StMemberVideo = styled.video`
  object-fit: cover;

  max-width: 100%;

  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 15rem;
  }
`;

// -----------------------------------------------------------

export const StMyVideo = styled.video`
  object-fit: contain;
`;
