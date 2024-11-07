import React, { useState } from 'react';

const PostSearchComponent = ({ onSearch }) => {
  //   const [searchText, setSearchText] = useState();
  const [searchParams, setSearchParams] = useState({
    searchText: '',
    searchType: 'title',
  });

  const handleTypeChange = (e) => {
    const { value } = e.target;
    setSearchParams((prev) => ({ ...prev, searchType: value }));
  };

  const handleTextChange = (e) => {
    const { value } = e.target;
    setSearchParams((prev) => ({ ...prev, searchText: value }));
  };

  const handleSearch = () => {
    onSearch(searchParams); // 버튼 클릭 시 검색 실행
  };

  const handleSearchCancel = () => {
    setSearchParams({ searchText: ' ', searchType: 'title' });
    onSearch(searchParams);
  };

  return (
    <>
      <select value={searchParams.searchType} onChange={handleTypeChange}>
        <option value="title">제목</option>
        <option value="content">본문</option>
        <option value="content">제목 + 본문</option>
        <option value="author">작성자</option>
      </select>
      <input
        type="text"
        value={searchParams.searchText}
        onChange={handleTextChange}
        placeholder="검색어를 입력하시오"
      ></input>
      <button onClick={handleSearch}>검색</button>
      <button onClick={handleSearchCancel}>검색취소</button>
    </>
  );
};

export default PostSearchComponent;
