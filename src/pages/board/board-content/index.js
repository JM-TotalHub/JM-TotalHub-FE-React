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
      {/* 게시판 전용 헤더 만들기 - 해당 게시판 내용*/}
      <h2>특정 게시판에 대한 내용</h2>
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
