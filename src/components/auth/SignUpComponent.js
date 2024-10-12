import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import authSignUpByUserData from '../../features/domains/auth/actions/SignUpAction';

const SignUpComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickName] = useState('');
  // const [loginType, setLoginType] = useState('normal'); // 일단은 일반회원만 받기
  // const [roleType, setRoleType] = useState('normal'); // admin은 DB로 직접 생성하도록 수정

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
          nickname,
        },
      })
    );
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="email">이메일(아이디):</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">비밀번호:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="nickname">닉네임:</label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickName(e.target.value)}
            required
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default SignUpComponent;
