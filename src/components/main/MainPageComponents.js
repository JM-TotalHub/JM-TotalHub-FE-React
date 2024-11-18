import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/connections/api';
import SignOutAction from '../../features/domains/auth/actions/SignOutAction';

const MainPageComponents = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loginStatus } = useSelector((state) => state.auth.userInfo);

  const handleSignOut = () => {
    // api.post('auth/sign-out'); // 이거 액션으로 수정해서 로그인 상태값 변경하도록 하자.
    dispatch(SignOutAction());
    navigate('/'); // 이거 현재 의미없음, 이 페이지가 / 임
  };

  useEffect(() => {}, [loginStatus]);

  return (
    <div>
      <h1>메인 페이지</h1>
      {/* <br />
      <Link to={`/boards`}>게시판</Link>
      <br /> */}

      {loginStatus && (
        <>
          <Link to={`/chats/chat-rooms`}>채팅</Link>
        </>
      )}
    </div>
  );
};

export default MainPageComponents;
