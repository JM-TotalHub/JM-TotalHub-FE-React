import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import CommentCreateComponent from '../../../components/board/comment/CommentCreateComponent';
import CommentListComponent from '../../../components/board/comment/CommentListComponent';
import PostDeleteButtonComponent from '../../../components/board/post/PostDeleteButtonComponent';
import PostDetailsComponent from '../../../components/board/post/PostDetailsComponent';

import {
  BoardButton,
  ButtonContainer,
  LeftButtonGroup,
  RightButtonGroup,
} from '../../../styles/commonButtonStyles';

import { Container } from './styles/PostDetailsStyles';

const PostDetailsPage = () => {
  const { boardId, postId } = useParams();
  const { pageNum } = useSelector((state) => state.board.postList);

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('edit');
  };

  const handleListClick = () => {
    navigate(`/boards/${boardId}/posts?page=${pageNum}`);
  };

  return (
    <Container>
      <PostDetailsComponent postId={postId}></PostDetailsComponent>
      <ButtonContainer>
        <LeftButtonGroup>
          <BoardButton onClick={handleListClick}>목록</BoardButton>
        </LeftButtonGroup>
        <RightButtonGroup>
          <BoardButton onClick={handleEditClick}>글 수정</BoardButton>
          <PostDeleteButtonComponent
            boardId={boardId}
            postId={postId}
            pageNum={pageNum}
          />
        </RightButtonGroup>
      </ButtonContainer>

      <CommentCreateComponent postId={postId}></CommentCreateComponent>
      <CommentListComponent postId={postId}></CommentListComponent>
    </Container>
  );
};

export default PostDetailsPage;
