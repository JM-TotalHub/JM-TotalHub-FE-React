import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import userInfoByToken from '../../features/domains/auth/actions/UserInfoAction';

const UserInfoLoader = () => {
  const dispatch = useDispatch();

  console.log('info 로더 작동');

  useEffect(() => {
    dispatch(userInfoByToken());
  }, [dispatch]);

  return null;
};

export default UserInfoLoader;
