import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../utils/connections/api';

const authSignUpByUserData = createAsyncThunk(
  'auth/authSignUpByUserData',
  async ({ bodyData }) => {
    const response = await api.post('auth/sign-up', bodyData);
    return response.data;
  }
);

export default authSignUpByUserData;
