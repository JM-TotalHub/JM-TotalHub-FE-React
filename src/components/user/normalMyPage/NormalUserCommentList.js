import React, { useEffect, useState } from 'react';
import api from '../../../utils/connections/api';
import Pagination from '../../common/Pagination';

const NormalUserCommentList = () => {
  const [commentList, setCommentList] = useState([]);

  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);

  const [searchType, setSearchType] = useState('content');
  const [searchText, setSearchText] = useState(' ');
  const [sortField, setSortField] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = ({ searchType, searchText }) => {
    setSearchType(searchType);
    setSearchText(searchText);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  useEffect(() => {
    const fetchUserCommentList = async () => {
      const response = await api.get(`boards/comments/users`, {
        params: {},
      });

      setCommentList(response.data.commentList);

      console.log('comments');
      console.log(response);
    };

    fetchUserCommentList();
  }, []);

  if (commentList) {
    return (
      <div>
        <h3>작성한 댓글</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>내용</th>
              <th>작성일</th>
              <th>게시판</th>
            </tr>
          </thead>
          <tbody>
            {commentList.map((comment) => (
              <tr key={comment.id}>
                <td>{comment.id}</td>
                <td>{comment.content}</td>
                <td>{comment.created_at}</td>
                <td>{comment.post.board.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    );
  }
};

export default NormalUserCommentList;
