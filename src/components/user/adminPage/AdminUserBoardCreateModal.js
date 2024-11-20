import React, { useEffect, useState } from 'react';
import api from '../../../utils/connections/api';

const AdminUserBoardCreateModal = ({ onClose }) => {
  const [boardName, setBoardName] = useState('');
  const [boardDescription, setBoardDescription] = useState('');

  const handelSubmit = (e) => {
    e.preventDefault();

    api.post(`/boards`, {
      name: boardName,
      description: boardDescription,
    });

    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>게시판 생성</h2>
        <form onSubmit={handelSubmit}>
          <label>게시판 이름</label>
          <input
            type="text"
            value={boardName}
            onChange={(e) => {
              setBoardName(e.target.value);
            }}
          ></input>
          <label>게시판 설명</label>
          <textarea
            type="text"
            value={boardDescription}
            onChange={(e) => {
              setBoardDescription(e.target.value);
            }}
          ></textarea>
          <button type="submit">생성</button>
          <button type="submit" onClick={onClose}>
            취소
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminUserBoardCreateModal;
