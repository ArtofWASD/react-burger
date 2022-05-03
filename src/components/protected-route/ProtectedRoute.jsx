import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedGuestRoute = ({ children }) => {
  const location = useLocation();
  const isLogin = useSelector((state) => state.authData.userState);
  if (isLogin === false || isLogin === 'loading') {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

const ProtectedUserRoute = ({ children }) => {
  const location = useLocation();
  const isLogin = useSelector((state) => state.authData.userState);
  if (isLogin === true && isLogin !== 'loading') {
    return <Navigate to={location.state.from.pathname} state={{ from: location }} />;
  }
  return children;
};

export { ProtectedGuestRoute, ProtectedUserRoute };
