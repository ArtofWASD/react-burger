import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginPage, RegisterPage, ForgotPasswordPage, ProfilePage, ResetPasswordPage, PageNotFoundPage, Orders, FeedPage } from "../../pages";
import { getCookieRequest } from "../../services/reducers/auth";
import { getUserData } from "../../services/reducers/userInfo";
import { fetchData } from "../../services/reducers/get-data";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ProtectedUserRoute, ProtectedGuestRoute } from "../protected-route/protected-route";

type TLocationState = {
  state:{
    background?: any
  }
}
function App() {
  function ModalSwitch() {
    const location = useLocation();
    const navigate = useNavigate();
    const {state} = location as TLocationState
    const background = location.state && state.background;
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(getUserData());
      dispatch(getCookieRequest());
      dispatch(fetchData());
    }, []);

    const handleModalClose = () => {
      navigate(-1);
    };

    return (
      <>
        <AppHeader />
        <Routes location={background || location}>
          <Route path="/" element={<Main />} />
          <Route
            path="/profile"
            element={
              <ProtectedGuestRoute>
                <ProfilePage />
              </ProtectedGuestRoute>
            }
          />
          <Route
            path="/profile/orders"
            element={
              <ProtectedGuestRoute>
                <Orders />
              </ProtectedGuestRoute>
            }
          />
          <Route
            path="/login"
            element={
              <ProtectedUserRoute>
                <LoginPage />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedUserRoute>
                <RegisterPage />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedUserRoute>
                <ForgotPasswordPage />
              </ProtectedUserRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <ProtectedUserRoute>
                <ResetPasswordPage />
              </ProtectedUserRoute>
            }
          />
          <Route path="/feed" element={<FeedPage />} />
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
