import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/connections/api';
import SignOutAction from '../../features/domains/auth/actions/SignOutAction';

const MainPageComponents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loginStatus } = useSelector((state) => state.auth.userInfo);

  useEffect(() => {}, [loginStatus]);

  return <div></div>;
};

export default MainPageComponents;
