import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate, Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  ProfilePage,
  ResetPasswordPage,
  PageNotFoundPage,
  Orders,
} from "../../pages";
import { getCookieRequest, getUserData } from "../../services/reducers/auth";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ProtectedRoute } from "../protected-route/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCookieRequest());
    dispatch(getUserData());
  }, []);

  function ModalSwitch() {
    const location = useLocation();
    const navigate = useNavigate();
    const background = location.state && location.state.background;
    const handleModalClose = () => {
      navigate(-1);
    };

    return (
      <>
        <AppHeader />
        <Routes location={background||location}>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute path="/login">
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/orders"
            element={
              <ProtectedRoute path="/login">
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/ingredients/:id" element={<IngredientDetails />} />
          <Route path="*" element={<PageNotFoundPage />} />
        </Routes>
        {background && (
          <Routes>
            <Route
              path="/ingredients/:id"
              element={
                <Modal
                  active={true}
                  setActive={() => {
                    handleModalClose();
                  }}
                >
                  <IngredientDetails />
                </Modal>
              }
            />
          </Routes>
        )}
      </>
    );
  }
  return (
    <BrowserRouter>
      <ModalSwitch />
    </BrowserRouter>
  );
}
export default App;
