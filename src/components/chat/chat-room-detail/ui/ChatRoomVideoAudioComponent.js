import React, { useState } from 'react';
import {
  ControlsContainer,
  MuteButton,
  VolumeSlider,
} from './styles/ChatRoomVideoAudioStyles';

const ChatRoomVideoAudioComponent = ({ videoRef }) => {
  // console.log('videoRef : ', videoRef);

  const [isMuted, setIsMuted] = useState(videoRef?.muted || false);

  const handleVolumeChange = (event) => {
    // console.log('음량조절');
    const volume = event.target.value;
    if (videoRef) {
      // console.log('음량조절2');
      videoRef.volume = volume;
      videoRef.muted = false; // 볼륨 조절 시 음소거 해제
      setIsMuted(false); // 상태도 음소거 해제로 업데이트
    }
  };

  const toggleMute = () => {
    // console.log('음소거');
    if (videoRef) {
      // console.log('음소거2');
      const newMutedState = !videoRef.muted;
      videoRef.muted = newMutedState;
      setIsMuted(newMutedState); // 상태 업데이트
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
