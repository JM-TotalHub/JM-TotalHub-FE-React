import boardListSlice from '../domains/board/board/slices/BoardListSlice';

import PostDeleteSlice from '../domains/board/post/slices/PostDeleteSlice';
import postDetailsSlice from '../domains/board/post/slices/PostDetailsSlice';
import postListSlice from '../domains/board/post/slices/PostListSlice';
import postCreateSlice from '../domains/board/post/slices/postCreateSlice';
import postUpdateSlice from '../domains/board/post/slices/postUpdateSlice';

import commentCreateSlice from '../domains/board/comment/slices/CommentCreateSlice';
import commentDeleteSlice from '../domains/board/comment/slices/CommentDeleteSlice';
import commentListSlice from '../domains/board/comment/slices/CommentListSlice';
import commentUpdateSlice from '../domains/board/comment/slices/CommentUpdateSlice';
import { combineReducers } from 'redux';

const boardReducer = combineReducers({
  // 게시판
  boardList: boardListSlice.reducer,

  // 게시글
  postList: postListSlice.reducer,
  postDetails: postDetailsSlice.reducer,
  postCreate: postCreateSlice.reducer,
  postUpdate: postUpdateSlice.reducer,
  postDelete: PostDeleteSlice.reducer,

  // 댓글
  commentList: commentListSlice.reducer,
  commentCreate: commentCreateSlice.reducer,
  commentUpdate: commentUpdateSlice.reducer,
  commentDelete: commentDeleteSlice.reducer,
});

export default boardReducer;
