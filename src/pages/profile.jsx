import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";
import AppHeader from "../components/app-header/app-header";
import styles from "../pages/styles.module.css";
export default function ProfilePage() {
  return (
    <>
      <AppHeader />
      <nav className="grid grid-cols-profile grid-rows-2 mt-32">
        <div className="ml-72">
          <ul className="grid gap-4 items-center">
            <NavLink to="/profile" className={({ isActive }) => (isActive ? `${styles.font}` : `${styles.font_grey}`)}>
              <li className={`text-2xl h-16 grid items-center`}>Профиль</li>
            </NavLink>
            <NavLink to="/history" className={({ isActive }) => (isActive ? `${styles.font}` : `${styles.font_grey}`)}>
              <li className={`text-2xl h-16 grid items-center`}>История заказов</li>
            </NavLink>
            <li className={`${styles.font_grey} text-2xl h-16 grid items-center`}>Выход</li>
          </ul>
        </div>
        <div className="grid gap-5 ">
          <Input placeholder="Имя" icon="EditIcon" type="text" />
          <Input placeholder="Логин" icon="EditIcon" type="text" />
          <Input placeholder="Пароль" icon="EditIcon" type="password" />
        </div>
        <p className={`${styles.font_grey} ml-72 opacity-40 grid mt-20 w-80 col-span-1 row-start-2`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
        <div className="row-start-2 col-start-2 grid grid-flow-col justify-items-end h-12 items-center mt-6">
          <p className={`${styles.font_blue} pl-48`}>Отмена</p>
          <Button>Сохранить</Button>
        </div>
      </nav>
    </>
  );
}
