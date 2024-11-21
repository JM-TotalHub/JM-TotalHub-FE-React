import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import boardListByNothing from '../../../features/domains/board/board/actions/BoardListAction';
import { Link } from 'react-router-dom';

import {
  Table,
  TableHead,
  TableHeadCell,
  TableRow,
  TableCell,
  IdColumn,
  NameColumn,
  DescriptionColumn,
  // CreatedAtColumn,
} from './styles/BoardListStyles';
import { selectBoard } from '../../../features/domains/board/board/slices/BoardListSlice';

const BoardList = () => {
  const dispatch = useDispatch();
  const { boardList, status, error } = useSelector(
    (state) => state.board.boardList
  );

  useEffect(() => {
    dispatch(boardListByNothing());
  }, []);

  if (status === 'idle') {
    return <div>Loading... 데이터를 요청합니다.</div>;
  }

  if (status === 'loading') {
    return <div>Loading... 데이터를 불러오고 있습니다.</div>;
  }

  if (status === 'failed') {
    console.log('api 통신 에러 : ' + error);
    return <div>Error: 게시판 데이터를 불러오지 못했습니다.</div>;
  }

  return (
    <div>
      <Table>
        <colgroup>
          <IdColumn />
          <NameColumn />
          <DescriptionColumn />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>이름</TableHeadCell>
            <TableHeadCell>설명</TableHeadCell>
            {/* <th>생성 시간</th> */}
          </TableRow>
        </TableHead>
        <tbody>
          {boardList.map((board) => (
            <TableRow key={board.id}>
              <TableCell>{board.id}</TableCell>
              <TableCell>
                <Link
                  to={`${board.id}/posts`}
                  onClick={() => dispatch(selectBoard(board.id))} // 클릭 시 selectBoard 호출
                >
                  {board.name}
                </Link>
              </TableCell>
              <TableCell>{board.description}</TableCell>
              {/* <td>{new Date(board.created_at).toLocaleString()}</td> */}
            </TableRow>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BoardList;
