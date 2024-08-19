import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../../utils/form/dateFormat';
import { htmlDecoder } from '../../../utils/form/htmlDecoder';

import postDetailsByPostId from '../../../features/domains/board/post/actions/PostDetailsAction';

import {
  Column,
  Container,
  Content,
  Label,
  Row,
  Value,
} from './styles/PostDetailsStyles';

const PostDetailsComponent = ({ postId }) => {
  const dispatch = useDispatch();

  const { postDetails, status, error } = useSelector(
    (state) => state.board.postDetails
  );

  useEffect(() => {
    dispatch(
      postDetailsByPostId({
        postId,
      })
    );
  }, [dispatch, postId]);

  if (status === 'idle') {
    return <div>Loading... 데이터를 요청합니다.</div>;
  }

  if (status === 'loading') {
    return <div>Loading... 데이터를 불러오고 있습니다.</div>;
  }

  if (status === 'failed') {
    console.log('api 통신 에러 : ' + error);
    return <div>Error: 게시글 데이터를 불러오지 못했습니다.</div>;
  }

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
          <Label htmlFor="userInfo" style={{ color: 'red' }}>
            사용자:
          </Label>
          <Value id="userInfo" style={{ color: 'red' }}>
            사용자정보(구현 중)
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
          <Label htmlFor="updatedAt">업데이트 일:</Label>
          <Value id="updatedAt">{formatDate(postDetails.updated_at)}</Value>
        </Column>
      </Row>

      <Content dangerouslySetInnerHTML={{ __html: decodedContent }} />
    </Container>
  );
};

export default PostDetailsComponent;
