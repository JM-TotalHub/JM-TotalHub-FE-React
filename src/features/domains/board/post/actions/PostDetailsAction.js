import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../../utils/connections/api';

const postDetailsByPostId = createAsyncThunk(
  'postDetails/postDetailsByPostId',
  async ({ postId }) => {
    const response = await api.get(`boards/posts/${postId}`);
    return response.data;
  }
);

export default postDetailsByPostId;
