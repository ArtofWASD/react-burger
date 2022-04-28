import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Main from "../main/main";
import { LoginPage, RegisterPage, ForgotPasswordPage, ProfilePage, IngridientsPage, ResetPasswordPage, PageNotFoundPage, Orders } from "../../pages";
import { getCookieRequest, getUserData } from "../../services/reducers/auth";
function App() {
  const isNavigate = useSelector((state) => state.resetData.status);
  const isLogged = useSelector((state) => state.authData.userData.success);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCookieRequest());
    dispatch(getUserData());
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={isLogged ? <Navigate replace to="/" /> : <LoginPage />} />
        <Route path="/profile" element={ !isLogged ? <Navigate replace to='/login'/> : <ProfilePage />} />
        <Route path="/profile/orders" element={ !isLogged ? <Navigate replace to='/login'/> : <Orders />} />
        <Route path="/register" element={ isLogged ? <Navigate replace to='/'/> : <RegisterPage />} />
        <Route path="/forgot-password" element={isLogged || isNavigate ? <Navigate replace to="/reset-password" /> : <ForgotPasswordPage />} />
        <Route path="/reset-password" element={isLogged ? <Navigate replace to='/'/>:<ResetPasswordPage/>} />
        <Route path="/ingredients/:id" element={<IngridientsPage/>}/>
        <Route path="*" element={<PageNotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
