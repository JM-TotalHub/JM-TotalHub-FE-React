import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../common/Pagination';

import CommentDeleteByCommentId from '../../../features/domains/board/comment/actions/CommentDeleteAction';
import commentListByPostId from '../../../features/domains/board/comment/actions/CommentListAction';
import CommentDetailsComponent from './CommentDetailsComponent';

import CommentUpdateComponent from './CommentUpdateComponent';
import {
  ButtonColumn,
  ContentColumn,
  CreatedAtColumn,
  DeleteButton,
  IdColumn,
  Table,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  UpdateButton,
} from './styles/CommentListStyles';

const CommentListComponent = ({ postId }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [editCommentId, setEditCommentId] = useState(null);

  const dispatch = useDispatch();

  // 댓글 목록
  const { commentList, totalPage, pageNum, status, error } = useSelector(
    (state) => state.board.commentList
  );

  // 댓글 생성 상태
  const { status: commentCreateStatus } = useSelector(
    (state) => state.board.commentCreate
  );

  // 댓글 업데이트 상태
  const { updateStatus: commentUpdateStatus } = useSelector(
    (state) => state.board.commentUpdate
  );

  // 댓글 삭제 상태
  const { status: commentDeleteStatus } = useSelector(
    (state) => state.board.commentDelete
  );

  const handleEdit = (commentId) => {
    setEditCommentId(commentId);
  };

  const handleDelete = (commentId) => {
    dispatch(CommentDeleteByCommentId({ commentId }));
  };

  useEffect(() => {
    dispatch(
      commentListByPostId({
        postId,
        queryData: { pageNum: currentPage, dataPerPage: 10 },
      })
    );
    if (commentUpdateStatus === 'succeeded') {
      setEditCommentId(null);
    }
  }, [
    // 댓글 페이지 변경 & 댓글 생성, 업데이트, 삭제 로직에 다시 랜더링
    currentPage,
    commentCreateStatus,
    commentUpdateStatus,
    commentDeleteStatus,
  ]);

  if (status === 'idle') {
    return <div>Loading... 데이터를 요청합니다.</div>;
  }

  if (status === 'loading' || commentCreateStatus === 'loading') {
    return <div>Loading... 데이터를 불러오고 있습니다.</div>;
  }

  if (status === 'failed') {
    console.log('api 통신 에러 : ' + error);
    return <div>Error: 게시글 데이터를 불러오지 못했습니다.</div>;
  }

  return (
    <div>
      <Table>
        <colgroup>
          <IdColumn />
          <ContentColumn />
          <CreatedAtColumn />
          <ButtonColumn />
        </colgroup>
        <TableHead>
          <TableRow>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>내용</TableHeadCell>
            <TableHeadCell>생성일</TableHeadCell>
            <TableHeadCell></TableHeadCell>
          </TableRow>
        </TableHead>
        <tbody>
          {commentList.map((comment) => (
            <TableRow key={comment.id}>
              {editCommentId === comment.id ? (
                // 댓글 업데이트 모드 상태(editCommentId 값이 있음)
                <>
                  <CommentDetailsComponent
                    commentId={comment.id}
                    commentContent={
                      <CommentUpdateComponent commentId={comment.id} />
                    }
                    commentCreatedAt={comment.created_at}
                  />
                </>
              ) : (
                // 댓글 업데이트 모드 아님
                <CommentDetailsComponent
                  commentId={comment.id}
                  commentContent={comment.content}
                  commentCreatedAt={comment.created_at}
                />
              )}
              <TableCell>
                {editCommentId === comment.id ? (
                  // 댓글 업데이트 모드(editCommentId 값이 있음)
                  <button onClick={() => setEditCommentId(null)}>
                    수정취소
                  </button>
                ) : (
                  // 댓글 업데이트 모드 아님
                  <>
                    <UpdateButton onClick={() => handleEdit(comment.id)}>
                      수정
                    </UpdateButton>
                    <DeleteButton onClick={() => handleDelete(comment.id)}>
                      삭제
                    </DeleteButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      <Pagination
        totalPage={totalPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default CommentListComponent;
