import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import postCreateByBoardIdAndData from '../../../features/domains/board/post/actions/PostCreateAction';
import PostFormComponent from './PostFormComponent';
import { postCreateSliceResetState } from '../../../features/domains/board/post/slices/postCreateSlice';

const PostCreateComponent = ({ boardId, pageNum }) => {
  const { status, error } = useSelector((state) => state.board.postCreate);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (status === 'succeeded') {
    dispatch(postCreateSliceResetState());
    navigate(`/boards/${boardId}/posts?page=${pageNum}`);
  }

  const submitHandler = useCallback(
    ({ title, content }) => {
      dispatch(
        postCreateByBoardIdAndData({
          boardId,
          bodyData: { title, content },
        })
      );
    },
    [dispatch, boardId]
  );

  return (
    <div>
      <PostFormComponent
        onSubmit={submitHandler}
        status={status}
        error={error}
      />
    </div>
  );
};

export default PostCreateComponent;
