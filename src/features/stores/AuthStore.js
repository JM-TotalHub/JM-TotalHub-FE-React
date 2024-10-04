import { combineReducers } from 'redux';

import AuthStatusSlice from '../domains/auth/slices/AuthStatus';
import authSignUpSlice from '../domains/auth/slices/SignUpSlice';
import authSignInSlice from '../domains/auth/slices/SignInSlice';
import UserInfoSlice from '../domains/auth/slices/UserInfoSlice';

const authReducer = combineReducers({
  authStatus: AuthStatusSlice.reducer,
  signUp: authSignUpSlice.reducer,
  signIn: authSignInSlice.reducer,
  userInfo: UserInfoSlice.reducer,
});

export default authReducer;
