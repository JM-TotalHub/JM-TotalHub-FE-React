import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../utils/connections/api';

const commentCreateByPostIdAndData = createAsyncThunk(
  'commentCreate/commentCreateByPostIdAndData',
  async ({ postId, bodyData }) => {
    const response = await api.post(
      `boards/posts/${postId}/comments`,
      bodyData
    );
    return response.data;
  }
);

export default commentCreateByPostIdAndData;
