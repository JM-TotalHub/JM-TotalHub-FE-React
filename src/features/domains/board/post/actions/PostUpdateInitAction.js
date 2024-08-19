import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../../utils/connections/api';

const postUpdateInitByPostId = createAsyncThunk(
  'postUpdateInit/postUpdateInitByPostId',
  async ({ postId }) => {
    const response = await api.get(`boards/posts/${postId}`);
    return response.data;
  }
);

export default postUpdateInitByPostId;
