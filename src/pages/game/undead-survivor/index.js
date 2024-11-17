import React from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const UndeadSurvivor = () => {
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    // loaderUrl: '/game/undead-survivor3/Build/test03.loader.js',
    // dataUrl: '/game/undead-survivor3/Build/test03.data',
    // frameworkUrl: '/game/undead-survivor3/Build/test03.framework.js',
    // codeUrl: '/game/undead-survivor3/Build/test03.wasm',
    loaderUrl: '/game/undead-survivor/Build/test.loader.js',
    dataUrl: '/game/undead-survivor/Build/test.data.gz',
    frameworkUrl: '/game/undead-survivor/Build/test.framework.js.gz',
    codeUrl: '/game/undead-survivor/Build/test.wasm.gz',
  });

  return (
    <div>
      {!isLoaded && (
        <p>Loading Application... {Math.round(loadingProgression * 100)}%</p>
      )}
      <Unity
        unityProvider={unityProvider}
        style={{ visibility: isLoaded ? 'visible' : 'hidden' }}
      />
    </div>
  );
};

export default UndeadSurvivor;
