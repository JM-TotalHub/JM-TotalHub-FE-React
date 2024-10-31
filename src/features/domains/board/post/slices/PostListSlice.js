import { createSlice } from '@reduxjs/toolkit';
import postListByBoardId from '../actions/PostListAction';

const postListSlice = createSlice({
  // 슬라이스 정의(store, reducer 중간 부분)
  name: 'postList',
  // state 값 초기 결정
  initialState: {
    postList: [],
    totalPage: 0,
    pageNum: 1,
    status: 'idle',
    error: null,
  },
  // 리듀서 정의 (액션처리 및 값 반환)
  // 이곳에서 액션 처리 상태별로 로직 및 반환 값
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postListByBoardId.pending, (state) => {
        // API 요청 시작 상태
        state.status = 'loading';
      })
      .addCase(postListByBoardId.fulfilled, (state, action) => {
        // API 요청 성공 상태
        console.log('게시글 리스트 : action.payload.postList');

        state.status = 'succeeded';
        state.postList = action.payload.postList;
        state.totalPage = action.payload.totalPage;
        state.pageNum = action.payload.pageNum;
      })
      .addCase(postListByBoardId.rejected, (state, action) => {
        // API 요청 실패 상태
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default postListSlice;
