import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import commentUpdateByCommentIdAndData from '../../../features/board/comment/actions/CommentUpdateAction';
import commentUpdateInitByCommentId from '../../../features/board/comment/actions/CommentUpdateInitAction';
import { commentUpdateSliceResetState } from '../../../features/board/comment/slices/CommentUpdateSlice';
import CommentFormComponent from './CommentFormComponent';
import { htmlDecoder } from '../../../utils/htmlDecoder';

const CommentUpdateComponent = ({ commentId }) => {
  const [initContent, setInItContent] = useState('');

  const { commentDetails, getStatus, updateStatus, error } = useSelector(
    (state) => state.board.commentUpdate
  );

  const dispatch = useDispatch();

  if (updateStatus === 'succeeded') {
    dispatch(commentUpdateSliceResetState());
  }

  useEffect(() => {
    dispatch(commentUpdateInitByCommentId({ commentId }));
  }, []);

  useEffect(() => {
    if (commentDetails) {
      const decodedContent = htmlDecoder(commentDetails.content || '');
      setInItContent(decodedContent);
    }
  }, [commentDetails]);

  const submitHandler = useCallback(
    ({ content }) => {
      dispatch(
        commentUpdateByCommentIdAndData({ commentId, bodyData: { content } })
      );
    },
    [dispatch, commentId]
  );

  return (
    <div>
      <h3>댓글작성 컴포넌트</h3>
      <CommentFormComponent
        initContent={initContent}
        onSubmit={submitHandler}
        status={updateStatus}
        error={error}
      />
    </div>
  );
};

export default CommentUpdateComponent;
