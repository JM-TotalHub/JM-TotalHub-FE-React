import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import CommentCreate from '../../../components/board/comment/CommentCreate';
import CommentList from '../../../components/board/comment/CommentList';
import PostDeleteButton from '../../../components/board/post/PostDeleteButton';

import {
  BoardButton,
  ButtonContainer,
  LeftButtonGroup,
  RightButtonGroup,
} from '../../../styles/commonButtonStyles';

import PostDetailsContent from '../../../components/board/post/PostDetailsContent';
import postDetailsByPostId from '../../../features/domains/board/post/actions/PostDetailsAction';
import { Container } from './styles/PostDetailsStyles';
import PostLikeButton from '../../../components/board/post/PostLikeButton';

const PostDetailsContentPage = () => {
  const dispatch = useDispatch();

  const { boardId, postId } = useParams();

  const { pageNum } = useSelector((state) => state.board.postList);
  const { userInfo } = useSelector((state) => state.auth.userInfo);
  const { postDetails } = useSelector((state) => state.board.postDetails);

  const navigate = useNavigate();

  const handleEditClick = () => {
    navigate('edit');
  };

  const handleListClick = () => {
    navigate(`/boards/${boardId}/posts?page=${pageNum}`);
  };

  useEffect(() => {
    dispatch(postDetailsByPostId(postId));
  }, [postId, userInfo]);

  if (postDetails) {
    return (
      <Container>
        <PostDetailsContent postId={postId}></PostDetailsContent>

        <PostLikeButton postId={postId} />

        <ButtonContainer>
          <LeftButtonGroup>
            <BoardButton onClick={handleListClick}>목록</BoardButton>
          </LeftButtonGroup>
          {userInfo && userInfo.id === postDetails?.user?.id && (
            <RightButtonGroup>
              <BoardButton onClick={handleEditClick}>글 수정</BoardButton>
              <PostDeleteButton
                boardId={boardId}
                postId={postId}
                pageNum={pageNum}
              />
            </RightButtonGroup>
          )}
        </ButtonContainer>

        <CommentCreate postId={postId}></CommentCreate>
        <CommentList postId={postId}></CommentList>
      </Container>
    );
  }
};

export default PostDetailsContentPage;
