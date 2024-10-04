import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSocket } from '../../SocketProvider';
import api from '../../api';
import {
  getNewAccessToken,
  setNewAccessToken,
} from '../../../../features/domains/auth/slices/AuthStatus';
import userInfoByToken from '../../../../features/domains/auth/actions/UserInfoAction';

const AuthListenerHandler = () => {
  const { socket } = useSocket();
  const { accessToken } = useSelector((state) => state.auth.authStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket || !socket.connected) return;

    const handleExpireAccessToken = async (data) => {
      console.log('토큰 갱신 요청 들어옴 : ', data);
      console.log('토큰 갱신 요청 원래 이벤트 : ', data.originalEvent);
      console.log('토큰 갱신 요청 원래 데이터 : ', data.originalData);

      if (data.err === 'TokenExpiredError') {
        console.log('소캣 요청에서 토큰 만료');
        try {
          dispatch(getNewAccessToken());
          await api.post(`/auth/new-token`, {});
          console.log('소캣 요청에서 토큰 재발행 완료');

          dispatch(setNewAccessToken());
          dispatch(userInfoByToken());
        } catch (refreshError) {
          console.log('토큰 갱신 실패', refreshError);
        }
      }
    };

    socket.on('error-auth', handleExpireAccessToken);

    return () => {
      socket.off('error-auth', handleExpireAccessToken);
    };
  }, [socket]);

  console.log('AccessToken Status : ', accessToken);
};

export default AuthListenerHandler;
