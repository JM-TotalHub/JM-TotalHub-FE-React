import React, { useEffect, useState } from 'react';

const NormalUserPassword = () => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await api.post(`/users/info/${userId}`);
      console.log(response);

      setUserInfo(response.data);
    };
    fetchUserInfo();
  }, []);

  return <div>비밀번호 변경</div>;
};

export default NormalUserPassword;
