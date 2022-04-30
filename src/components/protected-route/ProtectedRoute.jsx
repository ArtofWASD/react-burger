import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, path }) => {
  const location = useLocation();
  const isUser = useSelector((state) => state.authData.userData.success);
  if (!isUser) {
    return <Navigate to={path} state={{ from: location }} />;
  }
  return children
};

export { ProtectedRoute };
