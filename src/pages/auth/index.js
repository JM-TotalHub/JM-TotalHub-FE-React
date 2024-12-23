import { Outlet, Route, Routes } from 'react-router-dom';
import SignUpPage from './SignUpPage';
import SignInPage from './SignInPage';

const Auth = () => {
  return (
    <div>
      <Routes>
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default Auth;
