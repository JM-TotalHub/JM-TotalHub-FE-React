import React from 'react';
import { useParams } from 'react-router-dom';
import PostsList from '../../../components/board/post/PostList';

const PostsListPage = () => {
  const { boardId } = useParams();

  return (
    <div>
      <PostsList boardId={boardId} />
    </div>
  );
};
export default PostsListPage;
