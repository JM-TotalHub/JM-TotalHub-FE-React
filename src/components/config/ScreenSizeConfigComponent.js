import { debounce } from 'lodash';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateScreenSize } from '../../features/domains/config/slices/systemConfigSlice';

const ScreenSizeConfigComponent = () => {
  const dispatch = useDispatch();

  const handleResize = debounce(() => {
    dispatch(updateScreenSize(window.innerWidth));
  }, 100);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return;
};

export default ScreenSizeConfigComponent;
