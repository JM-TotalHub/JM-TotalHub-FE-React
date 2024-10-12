import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../../utils/connections/api';

const SignOutAction = createAsyncThunk('auth/SignOutAction', async () => {
  await api.post('auth/sign-out');
  return;
});

export default SignOutAction;
