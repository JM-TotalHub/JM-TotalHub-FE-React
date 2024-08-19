import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import postUpdateByPostIdAndData from '../../../features/domains/board/post/actions/PostUpdateAction';
import postUpdateInitByPostId from '../../../features/domains/board/post/actions/PostUpdateInitAction';
import { postUpdateSliceResetState } from '../../../features/domains/board/post/slices/postUpdateSlice';
import { htmlDecoder } from '../../../utils/form/htmlDecoder';
import PostFormComponent from './PostFormComponent';
import { useNavigate } from 'react-router-dom';

const PostUpdateComponent = ({ boardId, postId }) => {
  const [inItTitle, setInItTitle] = useState('');
  const [inItContent, setInItContent] = useState('');
  const { postDetails, getStatus, updateStatus, error } = useSelector(
    (state) => state.board.postUpdate
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (updateStatus === 'succeeded') {
    dispatch(postUpdateSliceResetState());
    navigate(`/boards/${boardId}/posts/${postId}`);
  }

  // 게시글 수정 작업이니 기존 데이터를 가져오는 작업
  useEffect(() => {
    dispatch(
      postUpdateInitByPostId({
        postId,
      })
    );
  }, []);

  // 기존데이터 가져오는 작업이 끝나 store(slice)에 정보가 최신화되면 가져와 초기값을  form컴포넌트에 전달
  useEffect(() => {
    if (postDetails) {
      setInItTitle(postDetails.title);
      const decodedContent = htmlDecoder(postDetails.content || '');
      setInItContent(decodedContent);
    }
  }, [postDetails]);

  const submitHandler = useCallback(
    ({ title, content }) => {
      dispatch(
        postUpdateByPostIdAndData({
          postId,
          bodyData: { title, content },
        })
      );
    },
    [dispatch, postId]
  );

  return (
    <div>
      <h3>수정 컴포넌트</h3>
      <PostFormComponent
        inItTitle={inItTitle}
        inItContent={inItContent}
        onSubmit={submitHandler}
        status={updateStatus}
        error={error}
      />
    </div>
  );
};

export default PostUpdateComponent;
