import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../../utils/connections/api';

const PostDeleteActionByPostId = createAsyncThunk(
  'postDelete/PostDeleteActionByPostId',
  async ({ postId }) => {
    await api.delete(`boards/posts/${postId}`);
  }
);

export default PostDeleteActionByPostId;
