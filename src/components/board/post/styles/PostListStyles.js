import styled from 'styled-components';

export const Container = styled.div`
  width: 95%;
  margin: 0 auto;
  padding: 0.2rem;

  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 1rem auto;
`;

export const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

export const TableHeadCell = styled.th`
  padding: 8px;
  border: 1px solid #ddd;
  text-align: center;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ddd;
  white-space: nowrap; /* 텍스트를 한 줄로 유지 */
  overflow: hidden; /* 넘치는 텍스트를 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트를 '...'로 표시 */
  max-width: 10rem; /* 최대 너비 설정 (필요에 따라 조정) */
`;

export const IdColumn = styled.col`
  width: 5%;
`;

export const TitleColumn = styled.col`
  width: 85%;
`;

export const CreatedAtColumn = styled.col`
  width: 10%;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-weight: bold;
`;

export const LoadingMessage = styled.div`
  color: blue;
  font-weight: bold;
`;
