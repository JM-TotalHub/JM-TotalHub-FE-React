import React from 'react';
import PostCreateComponent from '../../../components/board/post/PostCreateComponent';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostCreatePage = () => {
  const { boardId } = useParams();
  const { pageNum } = useSelector((state) => state.board.postList);

  return (
    <div>
      <h2>게시글 작성</h2>
      <PostCreateComponent boardId={boardId} pageNum={pageNum} />
    </div>
  );
};

export default PostCreatePage;
