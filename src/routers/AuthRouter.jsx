import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AuthRouter = ({ children }) => {
  const isAuthenticated = Cookies.get('authenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default AuthRouter;
