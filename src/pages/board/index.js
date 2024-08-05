import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';

import BoardContentPage from './board-content';
import BoardListComponent from '../../components/board/board/BoardListComponent';
import BoardListPage from './board/BoardListPage';

const Board = () => {
  return (
    <div>
      {/* 총합 게시판 고통 헤더 작성 - 핫한 게시판, 메뉴*/}
      <h1>게시판 헤더삽입 예정</h1>
      <Routes>
        <Route path="/" element={<BoardListPage />} />
        <Route path="/:boardId/*" element={<BoardContentPage />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default Board;
