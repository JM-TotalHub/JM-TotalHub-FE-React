import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import SignOutAction from '../../features/domains/auth/actions/SignOutAction';
import {
  AuthButton,
  AuthLink,
  UserContainer,
  MainHeaderWrapper,
  NavLinkItem,
  NavLinksContainer,
  UserInfo,
} from './styles/HeaderStyles';
import userInfoByToken from '../../features/domains/auth/actions/UserInfoAction';
import { onAlert } from '../../features/domains/alert/slices/alertStatusSlice';
import { AlertMessageEnum } from '../alert/AlertMessageEnum';

const MainHeaderComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo, loginStatus } = useSelector((state) => state.auth.userInfo);
  const { status: signInStatus } = useSelector((state) => state.auth.signIn);

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
    <MainHeaderWrapper>
      <UserContainer>
        <div style={{ marginRight: 'auto' }}>
          <h1>JM</h1>
        </div>
        {loginStatus ? (
          <>
            <UserInfo>
              {userInfo.nickname} ( {userInfo.email} )
            </UserInfo>
            <AuthButton onClick={handleSignOut}>로그아웃</AuthButton>
          </>
        ) : (
          <>
            <UserInfo>방문자</UserInfo>
            <AuthLink to={`/auth/sign-in`}>로그인</AuthLink>
            <AuthLink to={`/auth/sign-up`}>회원가입</AuthLink>
          </>
        )}
      </UserContainer>

      <NavLinksContainer>
        <NavLinkItem to={`/boards`}>게시판</NavLinkItem>
        <NavLinkItem
          to={loginStatus ? `/chats/chat-rooms` : '#'}
          onClick={loginStatus ? undefined : handleUnauthorizedAccess}
        >
          채팅
        </NavLinkItem>
        <NavLinkItem to={`#`}>준비중</NavLinkItem>
        <NavLinkItem to={`#`}>준비중</NavLinkItem>
        <NavLinkItem to={`#`}>준비중</NavLinkItem>
      </NavLinksContainer>
    </MainHeaderWrapper>
  );
};

export default MainHeaderComponent;
