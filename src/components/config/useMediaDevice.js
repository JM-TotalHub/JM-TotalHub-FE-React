import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

const useMediaDevice = () => {
  const theme = useTheme();
  const { mediaQueries } = theme;

  const [deviceState, setDeviceState] = useState({
    Mobile: false,
    Tablet: false,
    Desktop: false,
  });

  useEffect(() => {
    const updateDeviceState = () => {
      setDeviceState({
        Mobile: window.matchMedia(mediaQueries.mobile).matches,
        Tablet: window.matchMedia(mediaQueries.tablet).matches,
        Desktop: window.matchMedia(mediaQueries.desktop).matches,
      });
    };

    updateDeviceState();
    window.addEventListener('resize', updateDeviceState);

    return () => {
      window.removeEventListener('resize', updateDeviceState);
    };
  }, [mediaQueries]);

  return deviceState;
};

export default useMediaDevice;
