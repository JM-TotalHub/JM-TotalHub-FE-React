import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commentCreateByPostIdAndData from '../../../features/domains/board/comment/actions/CommentCreateAction';
import { commentCreateSliceResetState } from '../../../features/domains/board/comment/slices/CommentCreateSlice';
import CommentFormComponent from './CommentFormComponent';

const CommentCreate = ({ postId }) => {
  const { status, error } = useSelector((state) => state.board.commentCreate);

  const dispatch = useDispatch();

  if (status === 'succeeded') {
    dispatch(commentCreateSliceResetState());
  }

  const submitHandler = useCallback(
    ({ content }) => {
      dispatch(
        commentCreateByPostIdAndData({
          postId,
          bodyData: { content },
        })
      );
    },
    [dispatch, postId]
  );

  return (
    <div>
      <h3>댓글작성</h3>
      <CommentFormComponent
        onSubmit={submitHandler}
        status={status}
        error={error}
      />
    </div>
  );
};

export default CommentCreate;
