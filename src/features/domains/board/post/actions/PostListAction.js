import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../../utils/connections/api';

// Thunk 액션 생성
// (식별용 타입, 비동기 함수)
const postListByBoardId = createAsyncThunk(
  'postList/postListByBoardId',
  async ({ boardId, queryData }) => {
    // API 요청 수행
    const response = await api.get(`/boards/${boardId}/posts`, {
      params: queryData,
    });
    // API 응답 데이터 반환
    return response.data;
  }
);

export default postListByBoardId;
