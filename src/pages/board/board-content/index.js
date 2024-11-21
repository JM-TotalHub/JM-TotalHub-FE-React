import React from 'react';
import { Route, Routes, Outlet, useParams } from 'react-router-dom';

import PostListPage from './PostListPage';
import PostDetailsPage from './PostDetailsPage';
import PostCreatePage from './PostCreatePage';
import PostUpdatePage from './PostUpdatePage';
import { useSelector } from 'react-redux';

const BoardContentPage = () => {
  // const { boardId } = useParams();

  const { selectedBoard } = useSelector((state) => state.board.boardList);

  console.log(selectedBoard);

  return (
    <div>
      <h1 style={{ fontSize: '2.5rem', color: 'black', margin: '1rem' }}>
        {selectedBoard.name}
      </h1>
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
