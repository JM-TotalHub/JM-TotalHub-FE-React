import React from 'react';
import { Link } from 'react-router-dom';

const MainPageComponents = () => {
  return (
    <div>
      <h1>메인 페이지</h1>

      <h2>게시판</h2>
      <Link to={`/boards`}>게시판</Link>
      <br />
      <Link to={`/chats/chat-rooms`}>채팅</Link>
      <br />
      <Link to={`/auth/sign-up`}>회원가입</Link>
      <br />
      <Link to={`/auth/sign-in`}>로그인</Link>
    </div>
  );
};

export default MainPageComponents;
