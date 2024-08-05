import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authSignUpByUserData from '../../features/auth/actions/SignUpAction';
import { useNavigate } from 'react-router-dom';

const SignUpComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('');
  const [roleType, setRoleType] = useState('');

  const { status, error } = useSelector((state) => state.auth.signUp);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (status === 'succeeded') {
    navigate('/');
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      authSignUpByUserData({
        bodyData: {
          email,
          password,
          loginType,
          roleType,
        },
      })
    );
  };

  return (
    <div>
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
        <div>
          <label htmlFor="loginType">Login Type:</label>
          <input
            type="text"
            id="loginType"
            value={loginType}
            onChange={(e) => setLoginType(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="roleType">Role Type:</label>
          <input
            type="text"
            id="roleType"
            value={roleType}
            onChange={(e) => setRoleType(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpComponent;
