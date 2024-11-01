import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import AdminMyPage from './mypage/AdminMyPage';
import NormalMyPage from './mypage/NormalMyPage';

const User = () => {
  // 사용자 권한 파악은 auth를 통해서 & 실제 구현은 별도의 user API를 통해서(별도 가공 필요할 지도)
  const { userInfo } = useSelector((state) => state.auth.userInfo);

  return (
    <div>
      <Routes>
        {userInfo.roleType === 'admin' && (
          <Route path="/mypage/*" element={<AdminMyPage />} />
        )}
        {userInfo.roleType === 'normal' && (
          <Route path="/mypage/*" element={<NormalMyPage />} />
        )}
        {!['admin', 'normal'].includes(userInfo.roleType) && <></>}
      </Routes>
    </div>
  );
};

export default User;
