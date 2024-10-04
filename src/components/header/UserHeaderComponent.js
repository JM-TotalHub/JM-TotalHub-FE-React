import React from 'react';
import { useSelector } from 'react-redux';

const UserHeaderComponent = () => {
  const { userInfo, loginStatus } = useSelector((state) => state.auth.userInfo);

  console.log(`유저 헤더 데이터 : ${userInfo}`);
  console.log(userInfo);

  if (loginStatus) {
    return (
      <div>
        UserHeaderComponent
        <h3>
          현재 사용자 : {userInfo.nickname} / {userInfo.email}
        </h3>
      </div>
    );
  } else {
    return (
      <div>
        UserHeaderComponent
        <h3>방문자</h3>
      </div>
    );
  }
};

export default UserHeaderComponent;
