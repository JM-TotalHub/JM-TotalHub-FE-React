import React from 'react';
import { Unity, useUnityContext } from 'react-unity-webgl';

const UndeadSurvivor = () => {
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: '/game/undead-survivor3/unity-build/test03.loader.js',
    dataUrl: '/game/undead-survivor3/unity-build/test03.data',
    frameworkUrl: '/game/undead-survivor3/unity-build/test03.framework.js',
    codeUrl: '/game/undead-survivor3/unity-build/test03.wasm',
    // loaderUrl: '/game/undead-survivor/unity-build/undead-survivor.loader.js',
    // dataUrl: '/game/undead-survivor/unity-build/undead-survivor.data.br',
    // frameworkUrl:
    //   '/game/undead-survivor/unity-build/undead-survivor.framework.js.br',
    // codeUrl: '/game/undead-survivor/unity-build/undead-survivor.wasm.br',
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
