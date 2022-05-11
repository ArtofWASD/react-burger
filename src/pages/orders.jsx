import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../services/reducers/auth";
import styles from "../pages/styles.module.css";

export default function Orders() {
    const dispatch = useDispatch();
  return (
    <>
      <div className="ml-72 mt-32">
        <ul className="grid gap-4 items-center">
          <NavLink to="/profile" end className={({ isActive }) => (isActive ? `${styles.font}` : `${styles.font_grey}`)}>
            <li className={`text-2xl h-16 grid items-center`}>Профиль</li>
          </NavLink>
          <NavLink to="/profile/orders" end className={({ isActive }) => (isActive ? `${styles.font}` : `${styles.font_grey}`)}>
            <li className={`text-2xl h-16 grid items-center`}>История заказов</li>
          </NavLink>
          <NavLink to="/login">
            <li
              className={`${styles.font_grey} text-2xl h-16 grid items-center`}
              onClick={() => {
                dispatch(logOut());
              }}
            >
              Выход
            </li>
          </NavLink>
        </ul>
      </div>
    </>
  );
}
