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
} from './styles/PostListStyles'; // 스타일 컴포넌트 임포트

// useSearchParams 활용해서 파라미터 일괄 관리

const PostsListComponent = ({ boardId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 일단 나중에 Restful 하게 구현할지 고민 (지금 사실상 클라이언트, 백엔드 url이 별개로 다뤄지고 있음)
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const dataPerPage = parseInt(searchParams.get('dataPerPage')) || 10;
  const searchType = searchParams.get('search-type') || 'title';
  const searchText = searchParams.get('search-text') || ' ';

  const { device, screenSize } = useSelector(
    (state) => state.config.systemConfig
  );
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
      page: 1,
      'search-type': searchType,
      'search-text': searchText,
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
      <Table>
        <colgroup>
          {/* {!isMobile && <IdColumn />} */}
          {screenSize >= 768 && <IdColumn />}
          <TitleColumn />
          <UserColumn />
          <CreatedAtColumn />
        </colgroup>
        <TableHead>
          <TableRow>
            {screenSize >= 768 && <TableHeadCell>ID</TableHeadCell>}
            <TableHeadCell>제목</TableHeadCell>
            <TableHeadCell>작성자</TableHeadCell>
            <TableHeadCell>작성일</TableHeadCell>
          </TableRow>
        </TableHead>
        <tbody>
          {postList.map((post) => (
            <TableRow key={post.id}>
              {screenSize >= 768 && <TableCell>{post.id}</TableCell>}
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

export default PostsListComponent;
