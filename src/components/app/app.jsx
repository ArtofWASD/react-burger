import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LoginPage, RegisterPage, ForgotPasswordPage, ProfilePage, IngridientsPage, ResetPasswordPage, PageNotFoundPage, Orders } from "../../pages";
import { getCookieRequest, getUserData } from "../../services/reducers/auth";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";

function App() {
  const isNavigate = useSelector((state) => state.resetData.status);
  const isUser = useSelector((state) => state.authData.userData.success);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCookieRequest());
    dispatch(getUserData());
  });

  return (
    <BrowserRouter>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={isUser ? <Navigate replace to="/" /> : <LoginPage />} />
        <Route path="/profile" element={!isUser ? <Navigate replace to="/login" /> : <ProfilePage />} />
        <Route path="/profile/orders" element={!isUser ? <Navigate replace to="/login" /> : <Orders />} />
        <Route path="/register" element={isUser ? <Navigate replace to="/" /> : <RegisterPage />} />
        <Route path="/forgot-password" element={isUser || isNavigate ? <Navigate replace to="/reset-password" /> : <ForgotPasswordPage />} />
        <Route path="/reset-password" element={isNavigate ? <ResetPasswordPage /> : <Navigate replace to="/forgot-password" />} />
        <Route path="/ingredients/:id" element={<IngridientsPage />} />
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
