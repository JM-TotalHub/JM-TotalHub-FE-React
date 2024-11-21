import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../utils/connections/api';
import { onAlert } from '../../../features/domains/alert/slices/alertStatusSlice';
import { AlertMessageEnum } from '../../alert/AlertMessageEnum';

// 불필요한 랜더링 방지를 위해 좋아요 동작에 대해서 게시글 관련 리덕스 값 최신화 안함

const PostLikeButton = ({ postId }) => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth.userInfo);
  const { postDetails } = useSelector((state) => state.board.postDetails);

  const [likesCount, setLikesCount] = useState(postDetails.likesCount || 0);
  const [dislikesCount, setDislikesCount] = useState(
    postDetails.dislikesCount || 0
  );
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  const updateLikeStatus = async (type, action) => {
    try {
      await api.post(`/boards/posts/${postId}/likes`, { type, action });
      return true;
    } catch (error) {
      return false;
    }
  };

  const checkUserLogin = () => {
    if (!userInfo) {
      dispatch(
        onAlert({
          message: AlertMessageEnum.LOGIN_REQUIRED,
          link: `/auth/sign-in`,
          linkMessage: '로그인',
        })
      );
      return false;
    }
    return true;
  };

  const handleLike = async () => {
    if (!checkUserLogin()) return;

    if (hasLiked) {
      // 좋아요 취소
      const response = await updateLikeStatus('like', 'delete');
      if (response) {
        setLikesCount(likesCount - 1);
        setHasLiked(false);
      }
    } else {
      // 좋아요 추가
      const response = await updateLikeStatus('like', 'add');
      if (response) {
        setLikesCount(likesCount + 1);
        setHasLiked(true);
      }

      if (hasDisliked) {
        // 싫어요 취소
        const response = await updateLikeStatus('dislike', 'delete');
        if (response) {
          setDislikesCount(dislikesCount - 1);
          setHasDisliked(false);
        }
      }
    }
  };

  const handleDislike = async () => {
    if (!checkUserLogin()) return;

    if (hasDisliked) {
      // 비추천 취소
      const response = await updateLikeStatus('dislike', 'delete');
      if (response) {
        setDislikesCount(dislikesCount - 1);
        setHasDisliked(false);
      }
    } else {
      // 비추천 추가
      const response = await updateLikeStatus('dislike', 'add');
      if (response) {
        setDislikesCount(dislikesCount + 1);
        setHasDisliked(true);
      }

      if (hasLiked) {
        // 좋아요 취소
        const response = await updateLikeStatus('like', 'delete');
        if (response) {
          setLikesCount(likesCount - 1);
          setHasLiked(false);
        }
      }
    }
  };

  useEffect(() => {
    if (!postDetails) return;

    if (postDetails.userLiked) {
      setHasLiked(true);
    }

    if (postDetails.userDisliked) {
      setHasDisliked(true);
    }
  }, [userInfo, postDetails]);

  return (
    <div>
      <div>
        <button onClick={handleLike}>추천 ({likesCount})</button>
        <button onClick={handleDislike}>비추천 ({dislikesCount})</button>
      </div>
    </div>
  );
};

export default PostLikeButton;
