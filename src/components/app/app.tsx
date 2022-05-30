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
import FeedOrderInfo from "../feed-order-info/feed-order-info";

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
            path="/profile/orders/:id"
            element={
              <ProtectedGuestRoute>
                <FeedOrderInfo />
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
          <Route path="/feed/:id" element={<FeedOrderInfo />} />
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
            <Route
              path="/feed/:id"
              element={
                <Modal
                  active={true}
                  setActive={() => {
                    handleModalClose();
                  }}
                >
                  <FeedOrderInfo />
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
