import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../../utils/connections/api';

const postCreateByBoardIdAndData = createAsyncThunk(
  'postCreate/postCreateByBoardIdAndData',
  async ({ boardId, bodyData }) => {
    const response = await api.post(`boards/${boardId}/posts`, bodyData);
    return response.data;
  }
);

export default postCreateByBoardIdAndData;
