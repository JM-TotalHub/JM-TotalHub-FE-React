import React from 'react';
import { Route, Routes, Outlet, useParams } from 'react-router-dom';

import PostListPage from './PostListPage';
import PostDetailsPage from './PostDetailsPage';
import PostCreatePage from './PostCreatePage';
import PostUpdatePage from './PostUpdatePage';

const BoardContentPage = () => {
  // const { boardId } = useParams();

  return (
    <div>
      <Routes>
        <Route path="posts" element={<PostListPage />} />
        <Route path="posts/:postId" element={<PostDetailsPage />} />
        <Route path="posts/new" element={<PostCreatePage />} />
        <Route path="posts/:postId/edit" element={<PostUpdatePage />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default BoardContentPage;
