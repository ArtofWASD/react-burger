import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import AppHeader from "../components/app-header/app-header";
import styles from "../pages/styles.module.css";
export default function ProfilePage() {
  return (
    <>
      <AppHeader />
      <section className="grid grid-cols-profile mt-32">
        <div className="ml-72">
          <ul className="grid gap-4 items-center">
            {/* <NavLink className={({ isActive }) => isActive ? 'red' : 'blue'}>
              Профиль
            </NavLink> */}
            <li className={`${styles.font} text-2xl h-16 grid items-center`}>Профиль</li>
            <li className={`${styles.font_grey} text-2xl h-16 grid items-center`}>История заказов</li>
            <li className={`${styles.font_grey} text-2xl h-16 grid items-center`}>Выход</li>
          </ul>
        </div>
        <div className="grid gap-5 ">
          <Input placeholder="Имя" icon="EditIcon" type="text" />
          <Input placeholder="Логин" icon="EditIcon" type="text" />
          <Input placeholder="Пароль" icon="EditIcon" type="password" />
        </div>
      </section>
      <p className={`${styles.font_grey} opacity-40 mt-20 ml-72 w-80 `}>В этом разделе вы можете изменить свои персональные данные</p>
    </>
  );
}
