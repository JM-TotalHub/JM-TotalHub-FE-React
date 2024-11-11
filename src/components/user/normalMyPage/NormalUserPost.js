import React, { useEffect, useState } from 'react';
import api from '../../../utils/connections/api';
import Pagination from '../../common/Pagination';

const NormalUserPost = () => {
  const [postList, setPostList] = useState([]);

  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [searchType, setSearchType] = useState('title');
  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [status, setStatus] = useState('idle');

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = ({ searchType, searchText }) => {
    setSearchType(searchType);
    setSearchText(searchText);
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  useEffect(() => {
    const fetchUserPostList = async () => {
      const response = await api.get(`/boards/posts/users`, {
        params: {
          pageNum: currentPage,
          dataPerPage,
          searchType,
          searchText,
          sortOrder,
        },
      });

      setPostList(response.data.postList);
      console.log(response.data.postList);
    };
    fetchUserPostList();
  }, []);

  if (postList) {
    return (
      <div>
        <h3>작성한 게시물</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>제목</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {postList.map((post) => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.created_at}</td>
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
  } else {
    return <div>불러오는 중...</div>;
  }
};

export default NormalUserPost;
