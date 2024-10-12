import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authSignInByUserData from '../../features/domains/auth/actions/SignInAction';
import userInfoByToken from '../../features/domains/auth/actions/UserInfoAction';

const SignInComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loginType, setLoginType] = useState('normal');
  // const [roleType, setRoleType] = useState('normal'); // admin은 DB로 직접 생성하도록 수정

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.auth.signIn);

  if (status === 'succeeded') {
    dispatch(userInfoByToken());
    navigate('/');
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      authSignInByUserData({
        bodyData: {
          email,
          password,
        },
      })
    );
  };

  return (
    <div>
      SignInComponent
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default SignInComponent;
