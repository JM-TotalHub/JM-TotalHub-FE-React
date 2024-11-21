import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import postListByBoardId from '../../../features/domains/board/post/actions/PostListAction';
import { formatDateWithToday } from '../../../utils/form/dateFormat';
import Pagination from '../../common/Pagination';

import {
  BoardButton,
  ButtonContainer,
  LeftButtonGroup,
  RightButtonGroup,
} from '../../../styles/commonButtonStyles';

import useMediaDevice from '../../config/useMediaDevice';
import PostSearchComponent from './PostSearchComponent';
import {
  Container,
  CreatedAtColumn,
  IdColumn,
  Table,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TitleColumn,
  UserColumn,
} from './styles/PostListStyles';

// useSearchParams 활용해서 파라미터 일괄 관리

const PostsList = ({ boardId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 일단 나중에 Restful 하게 구현할지 고민 (지금 사실상 클라이언트, 백엔드 url이 별개로 다뤄지고 있음)
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const dataPerPage = parseInt(searchParams.get('dataPerPage')) || 10;
  const searchType = searchParams.get('search-type') || 'title';
  const searchText = searchParams.get('search-text') || ' ';
  const sortField = searchParams.get('sort-field') || 'created_at';
  const sortOrder = searchParams.get('sort-order') || 'desc';

  const device = useMediaDevice();
  const { postList, totalPage, pageNum, status, error } = useSelector(
    (state) => state.board.postList
  );

  const handleGotoBoardListClick = () => {
    navigate('/boards');
  };

  const handleGotoBoardCreateClick = () => {
    navigate('new');
  };

  const handlePageNum = (page) => {
    setSearchParams({ ...Object.fromEntries(searchParams), page });
  };

  const handleSearch = ({ searchText, searchType }) => {
    setSearchParams({
      ...Object.fromEntries(searchParams), // 기존 파라미터 유지
      page: 1,
      'search-type': searchType,
      'search-text': searchText,
    });
  };

  const handleSortOrder = (event) => {
    setSearchParams({
      ...Object.fromEntries(searchParams), // 기존 파라미터 유지
      //  page: 1,
      'sort-order': event.target.value, // 새로운 정렬 기준 추가
    });
  };

  useEffect(() => {
    dispatch(
      postListByBoardId({
        boardId,
        queryData: {
          pageNum: currentPage,
          dataPerPage: dataPerPage,
          searchType: searchType,
          searchText: searchText,
          sortField: sortField,
          sortOrder: sortOrder,
        },
      })
    );
  }, [searchParams]);

  if (status === 'idle') {
    return <div>Loading... 데이터를 요청합니다.</div>;
  }

  if (status === 'loading') {
    return <div>Loading... 데이터를 불러오고 있습니다.</div>;
  }

  if (status === 'failed') {
    console.log('api 통신 에러 : ' + error);
    return <div>Error: 게시글 데이터를 불러오지 못했습니다.</div>;
  }

  return (
    <Container>
      {/* 정렬 기준 - 일단은 작성일 기준으로먄  */}
      <select value={sortOrder} onChange={handleSortOrder}>
        <option value="desc">내림차순</option>
        <option value="asc">오름차순</option>
      </select>

      <Table>
        <colgroup>
          {/* {!isMobile && <IdColumn />} */}
          {device !== 'mobile' && <IdColumn />}
          <TitleColumn />
          <UserColumn />
          <CreatedAtColumn />
        </colgroup>
        <TableHead>
          <TableRow>
            {device !== 'mobile' && <TableHeadCell>ID</TableHeadCell>}
            <TableHeadCell>제목</TableHeadCell>
            <TableHeadCell>작성자</TableHeadCell>
            <TableHeadCell>작성일</TableHeadCell>
          </TableRow>
        </TableHead>
        <tbody>
          {postList.map((post) => (
            <TableRow key={post.id}>
              {device !== 'mobile' && <TableCell>{post.id}</TableCell>}
              <TableCell>
                <Link to={`${post.id}`}>{post.title}</Link>
              </TableCell>
              <TableCell>{post.user.nickname}</TableCell>
              <TableCell>
                {/* {new Date(post.created_at).toLocaleString()} */}
                {formatDateWithToday(post.created_at)}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <ButtonContainer>
        <LeftButtonGroup>
          <BoardButton onClick={handleGotoBoardListClick}>
            게시판 목록
          </BoardButton>
        </LeftButtonGroup>

        <PostSearchComponent onSearch={handleSearch} />

        <RightButtonGroup>
          <BoardButton onClick={handleGotoBoardCreateClick}>글작성</BoardButton>
        </RightButtonGroup>
      </ButtonContainer>
      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        onPageChange={handlePageNum}
      />
    </Container>
  );
};

export default PostsList;
