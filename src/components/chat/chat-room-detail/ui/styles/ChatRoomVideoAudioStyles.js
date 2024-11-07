import styled from 'styled-components';

export const ControlsContainer = styled.div``;

export const VolumeSlider = styled.input``;

export const MuteButton = styled.button``;

// ====================================================================

// export const ControlsContainer = styled.div`
//   position: relative;

//   display: flex;
//   align-items: center;

//   height: 15%;
//   width: 100%;
//   bottom: 0;

//   flex-direction: column;
//   align-items: center;
// `;

// export const VolumeSlider = styled.input`
//   width: 150px;
//   margin: 10px 0;
// `;

// export const MuteButton = styled.button`
//   background-color: ${(props) => (props.isMuted ? 'red' : 'gray')};
//   color: ${(props) => (props.isMuted ? 'white' : 'black')}; // 글자 색 변경
//   padding: 5px 10px;
//   border: none;
//   cursor: pointer;
//   transition: background-color 0.3s ease;

//   &:hover {
//     background-color: ${(props) => (props.isMuted ? 'darkred' : 'darkgray')};
//   }
// `;
