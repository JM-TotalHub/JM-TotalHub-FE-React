import React, { useEffect, useState } from 'react';
import api from '../../utils/connections/api';

const MainPagePostListComponent = () => {
  const [postList, setPostList] = useState([]);

  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);

  const [searchType, setSearchType] = useState('title');
  const [searchText, setSearchText] = useState(' ');
  const [sortField, setSortField] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');

  useEffect(() => {
    const fetchPostList = async () => {
      const response = await api.get(`/boards/posts/users`, {
        params: {
          pageNum: currentPage,
          dataPerPage,
          searchType,
          searchText,
          sortField,
          sortOrder,
        },
      });

      setPostList(response.data.postList);
    };

    fetchPostList();
  }, []);

  return <div>MainPagePostListComponent</div>;
};

const [postList, setPostList] = useState([]);

useEffect(() => {
  api.get;
}, []);

export default MainPagePostListComponent;
