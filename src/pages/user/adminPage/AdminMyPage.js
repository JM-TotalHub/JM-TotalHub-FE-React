import React, { useState } from 'react';
import AdminUserBoardCreateModal from '../../../components/user/adminPage/AdminUserBoardCreateModal';

// <관리자의 관리페이지로서 여기서만 가능한 것들>

// 별도의 게시판 생성 파트
// 게시글, 댓글은 모두에게 보이는 것이니 관리는 가능하면 해당 페이지에서 (나중에는 별도의 검색 기능을 통해 골라서 삭제 가능하게)
// 채팅방은 개개인의 것도 있으니, 여기서 전부 열람 가능하게
// 사이트 이용 현환 파악 가능하게

// <개발 순서>
// 게시판 생성
// 채팅방 전체 목록
// 채팅방 CRUD
// 사이트 이용현황

const AdminMyPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <h2>관리자 페이지</h2>
      <button onClick={openModal}>게시판 생성</button>
      {isModalOpen && <AdminUserBoardCreateModal onClose={closeModal} />}
    </div>
  );
};

export default AdminMyPage;
