import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
import Main from '../main/main'
import { LoginPage, RegisterPage, ForgotPasswordPage, ProfilePage, IngridientsPage, ResetPasswordPage, PageNotFoundPage} from "../../pages";
function App() {
  const isNavigate = useSelector((state) => state.resetData.status)
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginPage />} />
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
