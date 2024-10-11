import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import SignOutAction from '../../features/domains/auth/actions/SignOutAction';

const UserHeaderComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo, loginStatus } = useSelector((state) => state.auth.userInfo);

  const handleSignOut = () => {
    dispatch(SignOutAction());
    navigate('/'); // 이거 현재 의미없음, 이 페이지가 / 임
  };

  useEffect(() => {}, [loginStatus]);

  if (loginStatus) {
    return (
      <div>
        <h4>
          {userInfo.nickname} ( {userInfo.email} )
        </h4>
        <button onClick={handleSignOut}>로그아웃</button>
      </div>
    );
  } else {
    return (
      <div>
        <h4>방문자</h4>
        <>
          <Link to={`/auth/sign-up`}>회원가입</Link>
          <br />
          <Link to={`/auth/sign-in`}>로그인</Link>
          <br />
        </>
      </div>
    );
  }

  // return (
  //   <div>
  //     {loginStatus && (
  //       <div>
  //         <h4>
  //           {userInfo.nickname} ( {userInfo.email} )
  //         </h4>
  //       </div>
  //     )}
  //   </div>
  // );
};

export default UserHeaderComponent;
