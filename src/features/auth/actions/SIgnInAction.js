import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../utils/connections/api';

const authSignInByUserData = createAsyncThunk(
  'auth/authSignInByUserData',
  async ({ bodyData }) => {
    const response = await api.post('auth/sign-in', bodyData);
    return response.data;
  }
);

export default authSignInByUserData;
