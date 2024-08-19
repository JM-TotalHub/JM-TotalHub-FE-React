import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../../utils/connections/api';

const commentUpdateByCommentIdAndData = createAsyncThunk(
  'comment/commentUpdateByCommentIdAndData',
  async ({ commentId, bodyData }) => {
    const response = await api.put(`/boards/comments/${commentId}`, bodyData);
    return response.data;
  }
);

export default commentUpdateByCommentIdAndData;
