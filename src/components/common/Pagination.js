import React from 'react';

import { PaginationContainer, PageButton } from './styles/PaginationStyles';

const Pagination = ({ totalPage, currentPage, onPageChange }) => {
  const pageGroupSize = 10; // 한 번에 보여줄 페이지 개수
  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPage);

  const handleFirstPage = () => onPageChange(1);
  const handleLastPage = () => onPageChange(totalPage);
  const handlePreviousGroup = () => onPageChange(startPage - pageGroupSize);
  const handleNextGroup = () => onPageChange(startPage + pageGroupSize);

  return (
    <PaginationContainer>
      <PageButton onClick={handleFirstPage} disabled={currentPage === 1}>
        {'<<'}
      </PageButton>
      <PageButton onClick={handlePreviousGroup} disabled={startPage === 1}>
        {'<'}
      </PageButton>

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <PageButton
          key={startPage + index}
          onClick={() => onPageChange(startPage + index)}
          // active={(currentPage === startPage + index).toString()}
          // active={currentPage === startPage + index ? 'true' : 'false'}

          active={(currentPage === startPage + index).toString()}
        >
          {startPage + index}
        </PageButton>
      ))}

      <PageButton onClick={handleNextGroup} disabled={endPage === totalPage}>
        {'>'}
      </PageButton>
      <PageButton onClick={handleLastPage} disabled={currentPage === totalPage}>
        {'>>'}
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
