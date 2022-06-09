import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchWithRefresh } from "../services/reducers/auth-reducer/auth";
import { editUserInformation, getUserData } from "../services/reducers/user-info-reducer/user-Info";
import { logOut } from "../services/reducers/login-reducer/login";
import { useAppDispatch, useAppSelector } from "../utils/hook";
import styles from "../pages/styles.module.css";

export default function ProfilePage() {

  const [name, setName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    dispatch(fetchWithRefresh());
    dispatch(getUserData())
  }, [dispatch]);

  const userData = useAppSelector(state => state.userData.userData);

  const newUserData = {
    name: name,
    login: login,
  };

  function submitInput(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(editUserInformation(newUserData));
    navigate("/profile", { replace: true });
  }

  function logOutHandler(e: React.FormEvent<HTMLLIElement>) {
    e.preventDefault();
    dispatch(logOut());
    navigate("/", { replace: true });
  }
  function cancelInput() {
    setName('');
    setLogin('');
  }

  return (
    <>
      <nav className="grid grid-cols-profile grid-rows-2 mt-32">
        <div className="ml-72">
          <ul className="grid gap-4 items-center">
            <NavLink to="/profile" className={({ isActive }) => (isActive ? `${styles.font}` : `${styles.font_grey}`)}>
              <li className={`text-2xl h-16 grid items-center`}>Профиль</li>
            </NavLink>
            <NavLink to="/profile/orders" className={({ isActive }) => (isActive ? `${styles.font}` : `${styles.font_grey}`)}>
              <li className={`text-2xl h-16 grid items-center`}>История заказов</li>
            </NavLink>
            <NavLink to="/login">
              <li className={`${styles.font_grey} text-2xl h-16 grid items-center`} onClick={(e) => logOutHandler(e)}>
                Выход
              </li>
            </NavLink>
          </ul>
        </div>
        <form
          action="submit"
          onSubmit={(e) => {
            submitInput(e);
          }}
        >
          <div className="grid gap-5 ">
            <Input
              placeholder="Имя"
              icon="EditIcon"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={userData.user.name ? userData.user.name : ''}
            />
            <Input
              placeholder="Логин"
              icon="EditIcon"
              type="text"
              onChange={(e) => setLogin(e.target.value)}
              value={userData.user.email ? userData.user.email : ''}
            />
          </div>
          <div
            className={
              newUserData.login || newUserData.name ? "row-start-2 col-start-2 grid grid-flow-col justify-items-end h-12 items-center my-4" : "opacity-0"
            }
          >
            <p
              className={`${styles.font_blue} pl-48`}
              onClick={() => {
                cancelInput();
              }}
            >
              Отмена
            </p>
            <Button>Сохранить</Button>
          </div>
        </form>
        <p className={`${styles.font_grey} ml-72 opacity-40 grid mt-20 w-80 col-span-1 row-start-2`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
    </>
  );
}
// row-start-2 col-start-2 grid grid-flow-col justify-items-end h-12 items-center mt-6
