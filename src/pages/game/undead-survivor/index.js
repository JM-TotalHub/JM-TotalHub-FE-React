import React from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const UndeadSurvivor = () => {
  const { unityProvider, isLoaded } = useUnityContext({
    loaderUrl: '/game/undead-survivor/Build/test.loader.js.gz',
    dataUrl: '/game/undead-survivor/Build/test.data.gz',
    frameworkUrl: '/game/undead-survivor/Build/test.framework.js.gz',
    codeUrl: '/game/undead-survivor/Build/test.wasm.gz',
  });

  return (
    <div
      style={{
        position: 'relative',
        width: '66vw',
        height: '80vh',
        display: 'flex',
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto',
      }}
    >
      {isLoaded ? (
        <Unity
          unityProvider={unityProvider}
          style={{ width: '60%', height: '90%' }}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UndeadSurvivor;
