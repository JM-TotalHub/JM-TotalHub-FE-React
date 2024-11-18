import React from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const UndeadSurvivor = () => {
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: '/game/undead-survivor/unity-build/undead-survivor.loader.js',
    dataUrl: '/game/undead-survivor/unity-build/undead-survivor.data',
    frameworkUrl:
      '/game/undead-survivor/unity-build/undead-survivor.framework.js',
    codeUrl: '/game/undead-survivor/unity-build/undead-survivor.wasm',
  });

  // CSS 스타일 정의
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80vh',
    width: '100vw',
    backgroundColor: '#f0f0f0', // 배경색 (선택 사항)
  };

  const unityStyle = {
    width: '90%',
    height: '90%',
    maxWidth: '600px', // 최대 너비 제한 (선택 사항)
    maxHeight: '800px', // 최대 높이 제한 (선택 사항)
    visibility: isLoaded ? 'visible' : 'hidden',
  };

  return (
    <div style={containerStyle}>
      {!isLoaded && (
        <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
      )}
      <Unity unityProvider={unityProvider} style={unityStyle} />
    </div>
  );
};

export default UndeadSurvivor;
