import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../../utils/connections/api';

// 불필요한 랜더링 방지를 위해 좋아요 동작에 대해서 게시글 관련 리덕스 값 최신화 안함

const PostLikeButton = (postId) => {
  const { postDetails } = useSelector((state) => state.board.postDetails);

  const [likesCount, setLikesCount] = useState(postDetails.likesCount || 0);
  const [dislikesCount, setDislikesCount] = useState(
    postDetails.dislikesCount || 0
  );
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  const updateLikeStatus = async (type, action) => {
    await api.post(`/boards/${postId}/likes`, { type, action });
  };

  const handleLike = async () => {
    if (hasLiked) {
      // 좋아요 취소
      setLikesCount(likesCount - 1);
      setHasLiked(false);
      await updateLikeStatus('like', 'delete');
    } else {
      // 좋아요 추가
      setLikesCount(likesCount + 1);
      setHasLiked(true);
      await updateLikeStatus('like', 'add');

      if (hasDisliked) {
        // 싫어요 취소
        setDislikesCount(dislikesCount - 1);
        setHasDisliked(false);
        await updateLikeStatus('dislike', 'delete');
      }
    }
  };

  const handleDislike = async () => {
    if (hasDisliked) {
      // 비추천 취소
      setDislikesCount(dislikesCount - 1);
      setHasDisliked(false);
      await updateLikeStatus('dislike', 'delete');
    } else {
      // 비추천 추가
      setDislikesCount(dislikesCount + 1);
      setHasDisliked(true);
      await updateLikeStatus('dislike', 'add');

      if (hasLiked) {
        // 좋아요 취소
        setLikesCount(likesCount - 1);
        setHasLiked(false);
        await updateLikeStatus('like', 'delete');
      }
    }
  };

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
