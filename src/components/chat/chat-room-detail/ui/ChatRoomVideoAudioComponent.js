import React from 'react';
import {
  ControlsContainer,
  MuteButton,
  VolumeSlider,
} from './styles/ChatRoomVideoAudioStyles';

const ChatRoomVideoAudioComponent = ({ videoRef }) => {
  const handleVolumeChange = (event) => {
    const volume = event.target.value;
    if (videoRef) {
      videoRef.volume = volume;
      videoRef.muted = false; // 볼륨 조절 시 음소거 해제
    }
  };

  const toggleMute = () => {
    if (videoRef) {
      const isMuted = !videoRef.muted;
      videoRef.muted = isMuted;
    }
  };

  return (
    <ControlsContainer>
      {/* 볼륨 조절 슬라이더 */}
      <VolumeSlider
        type="range"
        min="0"
        max="1"
        step="0.01"
        defaultValue="1"
        onChange={handleVolumeChange}
      />
      {/* 음소거 버튼 */}
      <MuteButton isMuted={videoRef?.muted} onClick={toggleMute}>
        {videoRef?.muted ? '음소거 해제' : '음소거'}
      </MuteButton>
    </ControlsContainer>
  );
};

export default ChatRoomVideoAudioComponent;
