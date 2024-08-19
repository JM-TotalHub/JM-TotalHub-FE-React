import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../../utils/connections/api';

const commentListByPostId = createAsyncThunk(
  'commentList/commentListByPostId',
  async ({ postId, queryData }) => {
    const response = await api.get(`boards/posts/${postId}/comments`, {
      params: queryData,
    });
    return response.data;
  }
);

export default commentListByPostId;
