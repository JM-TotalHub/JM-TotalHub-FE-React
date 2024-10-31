import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import CommentCreateComponent from '../../../components/board/comment/CommentCreateComponent';
import CommentListComponent from '../../../components/board/comment/CommentListComponent';
import PostDeleteButtonComponent from '../../../components/board/post/PostDeleteButtonComponent';

import {
  BoardButton,
  ButtonContainer,
  LeftButtonGroup,
  RightButtonGroup,
} from '../../../styles/commonButtonStyles';

import PostDetailsContentComponent from '../../../components/board/post/PostDetailsContentComponent';
import postDetailsByPostId from '../../../features/domains/board/post/actions/PostDetailsAction';
import { Container } from './styles/PostDetailsStyles';

const PostDetailsContentPage = () => {
  const dispatch = useDispatch();

  const { boardId, postId } = useParams();

  const { pageNum } = useSelector((state) => state.board.postList);
  const { userInfo } = useSelector((state) => state.auth.userInfo);
  const { postDetails, status } = useSelector(
    (state) => state.board.postDetails
  );

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('edit');
  };

  const handleListClick = () => {
    navigate(`/boards/${boardId}/posts?page=${pageNum}`);
  };

  useEffect(() => {
    dispatch(
      postDetailsByPostId({
        postId,
      })
    );
  }, [postId]);

  if (status !== 'succeeded') {
    return <p>게시글 불러오는 중...</p>;
  }

  if (status === 'succeeded') {
    return (
      <Container>
        <PostDetailsContentComponent
          postId={postId}
        ></PostDetailsContentComponent>

        <ButtonContainer>
          <LeftButtonGroup>
            <BoardButton onClick={handleListClick}>목록</BoardButton>
          </LeftButtonGroup>
          {userInfo.id === postDetails?.user?.id && (
            <RightButtonGroup>
              <BoardButton onClick={handleEditClick}>글 수정</BoardButton>
              <PostDeleteButtonComponent
                boardId={boardId}
                postId={postId}
                pageNum={pageNum}
              />
            </RightButtonGroup>
          )}
        </ButtonContainer>

        <CommentCreateComponent postId={postId}></CommentCreateComponent>
        <CommentListComponent postId={postId}></CommentListComponent>
      </Container>
    );
  }
};

export default PostDetailsContentPage;
