import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { offAlert } from '../../features/domains/alert/slices/alertStatusSlice';
import {
  AlertContainer,
  AlertMessage,
  AlertLink,
  CloseButton,
  ButtonContainer,
} from './styles/CommonAlertStyles';

const CommonAlertComponent = () => {
  const { alertStatus, message, link, linkMessage } = useSelector(
    (state) => state.alert.commonAlert
  );
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (alertStatus) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        dispatch(offAlert());
      }, 3000); // 5초 후 알림 자동 종료
      return () => clearTimeout(timer);
    }
  }, [alertStatus, dispatch]);

  const handleClose = () => {
    setVisible(false);
    dispatch(offAlert());
  };

  return (
    <AlertContainer show={visible}>
      <AlertMessage>{message}</AlertMessage>
      <ButtonContainer linkExists={!!link}>
        {link && <AlertLink href={link}>{linkMessage}</AlertLink>}
        <CloseButton onClick={handleClose}>닫기</CloseButton>
      </ButtonContainer>
    </AlertContainer>
  );
};

export default CommonAlertComponent;
