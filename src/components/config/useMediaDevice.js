import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

const useMediaDevice = () => {
  const theme = useTheme();
  const { mediaQueries } = theme;

  const [device, setDevice] = useState('desktop'); // 기본값을 'desktop'으로 설정

  useEffect(() => {
    const updateDeviceState = () => {
      if (window.matchMedia(mediaQueries.mobile).matches) {
        setDevice('mobile');
      } else if (window.matchMedia(mediaQueries.tablet).matches) {
        setDevice('tablet');
      } else if (window.matchMedia(mediaQueries.desktop).matches) {
        setDevice('desktop');
      } else {
        setDevice('desktop');
      }
    };

    updateDeviceState();
    window.addEventListener('resize', updateDeviceState);

    return () => {
      window.removeEventListener('resize', updateDeviceState);
    };
  }, [mediaQueries]);

  return device;
};

export default useMediaDevice;
