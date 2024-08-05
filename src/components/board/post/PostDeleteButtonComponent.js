import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PostDeleteActionByPostId from '../../../features/board/post/actions/PostDeleteAction';
import { postDeleteSliceResetState } from '../../../features/board/post/slices/PostDeleteSlice';

import { BoardButton } from '../../../styles/commonButtonStyles';

const PostDeleteButtonComponent = ({ boardId, postId, pageNum }) => {
  const { status, error } = useSelector((state) => state.board.postDelete);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(postDeleteSliceResetState());
      navigate(`/boards/${boardId}/posts?page=${pageNum}`);
    }
  }, [status]);

  const handleDelete = () => {
    dispatch(PostDeleteActionByPostId({ postId }));
  };

  if (status === 'loading') {
    return <div>Loading... 데이터를 삭제 중입니다.</div>;
  }

  if (status === 'failed') {
    console.log('api 통신 에러 : ' + error);
    return <div>Error: 게시글 데이터를 삭제하지 못했습니다.</div>;
  }

  return <BoardButton onClick={handleDelete}>삭제</BoardButton>;
};

export default PostDeleteButtonComponent;
