import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;

  margin: 1rem auto;

  border-collapse: collapse;

  /* table-layout: fixed;  */
`;

export const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

export const TableHeadCell = styled.th`
  padding: 0.5rem;
  /* border: 0.1rem solid #ddd; */
  text-align: center;
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
`;

export const TableCell = styled.td`
  padding: 0 0.5rem;

  white-space: normal; /* 텍스트 줄 바꿈을 허용 */
  word-wrap: break-word; /* 긴 단어를 줄 바꿈 */
  overflow: hidden; /* 넘치는 텍스트를 숨김 */
`;

export const IdColumn = styled.col`
  width: 5%;
`;

export const ContentColumn = styled.col`
  width: 65%;
`;

export const CreatedAtColumn = styled.col`
  width: 15%;
`;

export const ButtonColumn = styled.col`
  width: 15%;
`;

export const UpdateButton = styled.button`
  background-color: #3e4dd5;
  color: white;
  border: none;
  padding: 0.3rem 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #283ceb;
  }
`;

export const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 0.3rem 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #ff1a1a;
  }
`;
