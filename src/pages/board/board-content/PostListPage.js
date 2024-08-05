import React from 'react';
import { useParams } from 'react-router-dom';
import PostsListComponent from '../../../components/board/post/PostListComponent';

const PostsListPage = () => {
  const { boardId } = useParams();

  return (
    <div>
      <PostsListComponent boardId={boardId} />
    </div>
  );
};
export default PostsListPage;
