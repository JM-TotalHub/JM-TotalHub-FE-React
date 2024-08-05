import { combineReducers } from 'redux';
import authSignUpSlice from '../features/auth/slices/SignUpSlice';
import authSignInSlice from '../features/auth/slices/SignInSlice';

const authReducer = combineReducers({
  signUp: authSignUpSlice.reducer,
  signIn: authSignInSlice.reducer,
});

export default authReducer;
