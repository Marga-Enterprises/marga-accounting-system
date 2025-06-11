import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const NonAuthRouter = ({ children }) => {
  const isAuthenticated = Cookies.get('authenticated') === 'true';
  return !isAuthenticated ? children : <Navigate to="/" replace />;
};

export default NonAuthRouter;
