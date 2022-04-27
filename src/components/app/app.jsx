import {useEffect} from 'react'
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Main from '../main/main'
import { LoginPage, RegisterPage, ForgotPasswordPage, ProfilePage, IngridientsPage, ResetPasswordPage, PageNotFoundPage} from "../../pages";
import {getCookieRequest} from '../../services/reducers/auth'
function App() {
  const isNavigate = useSelector((state) => state.resetData.status)
  const isLogged = useSelector((state) => state.authData.logInData.success)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCookieRequest())
  },[dispatch])

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={isLogged ? (<Navigate replace to='/'/>) : (<LoginPage />)} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={isNavigate ? (<Navigate replace to="/reset-password" />):(<ForgotPasswordPage />)} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/ingredients/:id" element={<IngridientsPage />} />
          <Route path="*" element={<PageNotFoundPage />} />
        </Routes>
      </BrowserRouter>
  );
}
export default App;
