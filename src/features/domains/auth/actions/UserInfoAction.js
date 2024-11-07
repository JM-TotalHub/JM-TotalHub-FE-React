import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../utils/connections/api';

const userInfoByToken = createAsyncThunk('auth/user-info', async () => {
  const response = await api.get('auth/user-info');
  return response.data;
});

export default userInfoByToken;
