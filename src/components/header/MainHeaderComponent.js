import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { onAlert } from '../../features/domains/alert/slices/alertStatusSlice';
import SignOutAction from '../../features/domains/auth/actions/SignOutAction';
import userInfoByToken from '../../features/domains/auth/actions/UserInfoAction';
import { AlertMessageEnum } from '../alert/AlertMessageEnum';
import {
  AuthButton,
  AuthLink,
  StLog,
  StMainHeader,
  StContentLink,
  StFirstLine,
  StSecondLine,
  StUserInfo,
  StUserFunctions,
} from './styles/HeaderStyles';
import useMediaDevice from '../config/useMediaDevice';

const MainHeaderComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo, loginStatus } = useSelector((state) => state.auth.userInfo);
  // const { status: signInStatus } = useSelector((state) => state.auth.signIn);

  const device = useMediaDevice();

  useEffect(() => {
    dispatch(userInfoByToken());
  }, []);

  const handleSignOut = () => {
    dispatch(SignOutAction());
    navigate('/'); // 이거 현재 의미없음, 이 페이지가 / 이여서
  };

  const handleUnauthorizedAccess = () => {
    dispatch(
      onAlert({
        message: AlertMessageEnum.LOGIN_REQUIRED,
        link: `/auth/sign-in`,
        linkMessage: '로그인',
      })
    );
  };

  return (
    <StMainHeader>
      <StFirstLine>
        <StLog>
          <h1>JM</h1>
        </StLog>
        <StUserFunctions>
          {loginStatus ? (
            <>
              <StUserInfo>{userInfo.nickname}</StUserInfo>
              <AuthButton onClick={handleSignOut}>로그아웃</AuthButton>
              <AuthLink to={`/users/mypage`}>마이페이지</AuthLink>
            </>
          ) : (
            <>
              <StUserInfo>방문자</StUserInfo>
              <AuthLink to={`/auth/sign-in`}>로그인</AuthLink>
              <AuthLink to={`/auth/sign-up`}>회원가입</AuthLink>
            </>
          )}
        </StUserFunctions>
      </StFirstLine>

      <StSecondLine>
        <StContentLink to={`/overviews`}>소개</StContentLink>
        <StContentLink to={`/boards`}>게시판</StContentLink>
        <StContentLink
          to={loginStatus ? `/chats/chat-rooms` : '#'}
          onClick={loginStatus ? undefined : handleUnauthorizedAccess}
        >
          채팅
        </StContentLink>
        <StContentLink to={`#`}>준비중</StContentLink>
        <StContentLink to={`#`}>준비중</StContentLink>
      </StSecondLine>
    </StMainHeader>
  );
};

export default MainHeaderComponent;
