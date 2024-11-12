import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NormalUserInfo from '../../../components/user/normalMyPage/NormalUserInfo';
import NormalUserPassword from '../../../components/user/normalMyPage/NormalUserPassword';
import NormalUserPostList from '../../../components/user/normalMyPage/NormalUserPostList';
import NormalUserCommentList from '../../../components/user/normalMyPage/NormalUserCommentList';

// 마이페이지는 개인 정보가 포함되어 있고, 다른 곳에서 가져다 쓰는 데이터도 거의 없으니
// 이번에는 그냥 해당되는 컴포넌트에서 useState로 데이터 관리 및 api 요청ee

const NormalMyPage = () => {
  // const { userInfo } = useSelector((state) => state.auth.userInfo);

  useEffect(() => {}, []);

  return (
    <div>
      <NormalUserInfo />
      <NormalUserPassword />
      <NormalUserPostList />
      <NormalUserCommentList />
    </div>
  );
};

export default NormalMyPage;
