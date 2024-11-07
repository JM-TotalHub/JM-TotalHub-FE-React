import React from 'react';
import { useSelector } from 'react-redux';
import { formatDate } from '../../../utils/form/dateFormat';
import { htmlDecoder } from '../../../utils/form/htmlDecoder';

import {
  Column,
  Container,
  Content,
  Label,
  Row,
  Value,
} from './styles/PostDetailsStyles';

const PostDetailsContentComponent = ({ postId }) => {
  const { postDetails } = useSelector((state) => state.board.postDetails);

  const decodedContent = htmlDecoder(postDetails.content);

  return (
    <Container>
      <Row>
        <Column flex={9}>
          <Label htmlFor="postTitle">제목:</Label>
          <Value id="postTitle">{postDetails.title}</Value>
        </Column>
      </Row>
      <Row>
        <Column flex={10}>
          <Label htmlFor="userInfo">작성자:</Label>
          <Value id="userInfo">
            {postDetails.user.nickname} ({postDetails.user.email})
          </Value>
        </Column>
      </Row>
      <Row>
        <Column flex={3}>
          <Label htmlFor="postId">게시글 ID:</Label>
          <Value id="postId">{postDetails.id}</Value>
        </Column>
        <Column flex={4}>
          <Label htmlFor="createdAt">생성일:</Label>
          <Value id="createdAt">{formatDate(postDetails.created_at)}</Value>
        </Column>
        <Column flex={4}>
          <Label htmlFor="updatedAt">수정일:</Label>
          <Value id="updatedAt">{formatDate(postDetails.updated_at)}</Value>
        </Column>
      </Row>

      <Content dangerouslySetInnerHTML={{ __html: decodedContent }} />
    </Container>
  );
};

export default PostDetailsContentComponent;
