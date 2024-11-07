import React, { useEffect, useState } from 'react';
import api from '../../../utils/connections/api';

const NormalUserInfo = ({ userId }) => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await api.get(`/users/info/${userId}`);
      console.log(response);

      setUserInfo(response.data);
    };
    fetchUserInfo();
  }, []);

  if (userInfo) {
    return (
      <div>
        <h2>마이페이지</h2>
        <div>ID : {userInfo.id}</div>
        <div>이메일 : {userInfo.email}</div>
        <div>닉네임 : {userInfo.nickname}</div>
        <div>권한 : {userInfo.roleType}</div>
        <div>로그인 형태 : {userInfo.loginType}</div>
      </div>
    );
  } else {
    return <div>로딩중...</div>;
  }
};

export default NormalUserInfo;
