import boardListSlice from '../features/board/board/slices/BoardListSlice';

import PostDeleteSlice from '../features/board/post/slices/PostDeleteSlice';
import postDetailsSlice from '../features/board/post/slices/PostDetailsSlice';
import postListSlice from '../features/board/post/slices/PostListSlice';
import postCreateSlice from '../features/board/post/slices/postCreateSlice';
import postUpdateSlice from '../features/board/post/slices/postUpdateSlice';

import commentCreateSlice from '../features/board/comment/slices/CommentCreateSlice';
import commentDeleteSlice from '../features/board/comment/slices/CommentDeleteSlice';
import commentListSlice from '../features/board/comment/slices/CommentListSlice';
import commentUpdateSlice from '../features/board/comment/slices/CommentUpdateSlice';
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
