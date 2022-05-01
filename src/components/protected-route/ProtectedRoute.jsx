import { useLocation, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const ProtectedGuestRoute = ({ children }) => {
  const location = useLocation();
  const isUser = useSelector((state) => state.authData.userData.success);
  console.log(isUser);
  if (!isUser) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

const ProtectedUserRoute = ({ children }) => {
  const location = useLocation();
  const isUser = useSelector((state) => state.authData.userData.success);
  if (isUser) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
};

export { ProtectedGuestRoute, ProtectedUserRoute };
