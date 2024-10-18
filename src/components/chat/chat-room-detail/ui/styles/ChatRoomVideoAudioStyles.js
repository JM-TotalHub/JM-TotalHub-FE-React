import styled from 'styled-components';

// Styled-components for styling audio controls
export const ControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const VolumeSlider = styled.input`
  width: 150px;
  margin: 10px 0;
`;

export const MuteButton = styled.button`
  background-color: ${(props) => (props.isMuted ? 'red' : 'gray')};
  color: ${(props) => (props.isMuted ? 'white' : 'black')}; // 글자 색 변경
  padding: 5px 10px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.isMuted ? 'darkred' : 'darkgray')};
  }
`;
