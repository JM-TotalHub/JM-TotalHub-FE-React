import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../utils/connections/api';

const commentUpdateInitByCommentId = createAsyncThunk(
  'comment/commentUpdateInitByCommentId',
  async ({ commentId }) => {
    const response = await api.get(`/boards/comments/${commentId}`); // 댓글 단일 조회 백엔드 만들어야함
    return response.data;
  }
);

export default commentUpdateInitByCommentId;
