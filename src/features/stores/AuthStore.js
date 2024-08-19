import { combineReducers } from 'redux';
import authSignUpSlice from '../domains/auth/slices/SignUpSlice';
import authSignInSlice from '../domains/auth/slices/SignInSlice';

const authReducer = combineReducers({
  signUp: authSignUpSlice.reducer,
  signIn: authSignInSlice.reducer,
});

export default authReducer;
