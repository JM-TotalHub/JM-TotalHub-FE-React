import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../utils/connections/api';

const userInfoByToken = createAsyncThunk('auth/user-info', async () => {
  const response = await api.get('auth/user-info');
  console.log(`유저정보 액션 응답 : ${response}`);
  console.log(response.data);

  return response.data;
});

export default userInfoByToken;
