import { ReactElement } from "react";
import { FC } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAppSelector } from "../../utils/hook";

type TProtectedRoute = {
  children: ReactElement;
};

type TLocationState = {
  state: {
    from: {
      pathname: string;
    };
  };
};
const ProtectedGuestRoute: FC<TProtectedRoute> = ({ children }) => {
  const location = useLocation();
  const isUser = useAppSelector((state) => state.userData.userState);
  const isLogin = useAppSelector((state) => state.loginData.loginState);
  if (isUser === false && isLogin === false) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
};

const ProtectedUserRoute: FC<TProtectedRoute> = ({ children }) => {
  const location = useLocation();
  const isUser = useAppSelector((state) => state.userData.userState);
  const isLogin = useAppSelector((state) => state.loginData.loginState);
  const { state } = location as TLocationState;
  if (isUser === true || isLogin === true) {
    return <Navigate to={state !== null ? state.from.pathname : `/`} state={{ from: location }} />;
  }
  return children;
};

export { ProtectedGuestRoute, ProtectedUserRoute };
