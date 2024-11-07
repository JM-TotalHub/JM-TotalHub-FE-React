import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const MainPage = () => {
  const { loginStatus } = useSelector((state) => state.auth.userInfo);

  useEffect(() => {}, [loginStatus]);

  return (
    <div>
      <h1>메인 페이지</h1>
      <h3>준비중...</h3>
    </div>
  );
};

export default MainPage;
