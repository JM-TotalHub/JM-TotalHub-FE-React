import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import postListByBoardId from '../../../features/domains/board/post/actions/PostListAction';
import Pagination from '../../common/Pagination';
import { formatDateWithToday } from '../../../utils/form/dateFormat';

import {
  ButtonContainer,
  LeftButtonGroup,
  RightButtonGroup,
  BoardButton,
} from '../../../styles/commonButtonStyles';

import {
  Container,
  Table,
  TableHead,
  TableHeadCell,
  TableCell,
  TableRow,
  IdColumn,
  TitleColumn,
  CreatedAtColumn,
  UserColumn,
} from './styles/PostListStyles'; // 스타일 컴포넌트 임포트
import { debounce } from 'lodash';

const PostsListComponent = ({ boardId }) => {
  const dispatch = useDispatch();

  const { postList, totalPage, pageNum, status, error } = useSelector(
    (state) => state.board.postList
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(
    pageParam ? parseInt(pageParam) : 1
  );

  const handlePageNum = (page) => {
    setSearchParams({ page });
    setCurrentPage(page);
  };

  const navigate = useNavigate();

  const handleGotoBoardListClick = () => {
    navigate('/boards');
  };

  const handleGotoBoardCreateClick = () => {
    navigate('new');
  };

  // 화면 크기 체크
  // const isMobile = window.innerWidth < 768;
  // 화면 크기 체크 및 상태 관리
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  console.log('isMobile : ', isMobile);

  // 디바운스된 resize 핸들러 생성
  const handleResize = debounce(() => {
    setIsMobile(window.innerWidth < 768);
  }, 200); // 200ms 대기 후 실행

  useEffect(() => {
    // Resize 이벤트 리스너 등록
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(
      postListByBoardId({
        boardId,
        // queryData: { pageNum: 1, dataPerPage: 10, searchType: 'title', searchText: '테스트' },
        queryData: { pageNum: currentPage, dataPerPage: 10 },
      })
    );
  }, [currentPage]);

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
      <Table>
        <colgroup>
          {!isMobile && <IdColumn />}
          <TitleColumn />
          <UserColumn />
          <CreatedAtColumn />
        </colgroup>
        <TableHead>
          <TableRow>
            {!isMobile && <TableHeadCell>ID</TableHeadCell>}
            <TableHeadCell>제목</TableHeadCell>
            <TableHeadCell>작성자</TableHeadCell>
            <TableHeadCell>작성일</TableHeadCell>
          </TableRow>
        </TableHead>
        <tbody>
          {postList.map((post) => (
            <TableRow key={post.id}>
              {!isMobile && <TableCell>{post.id}</TableCell>}
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

export default PostsListComponent;
