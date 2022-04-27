import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, Link, useLocation } from "react-router-dom";

function AppHeader() {
  const location = useLocation()
  return (
    <header className={styles.header}>
      <nav className="flex flex-auto justify-center">
        <section className="flex items-center py-4">
          <section className="flex gap-2 mr-6">
            <BurgerIcon type={location.pathname==='/' ? 'primary': "secondary"} />
            <NavLink to="/" className={({ isActive }) => (isActive ? `${styles.headerTextActive}` : `${styles.headerText}`)}>
              Конструктор
            </NavLink>
          </section>
          <section className="flex gap-2">
            <ListIcon type={location.pathname==='/orders-list' ? 'primary': "secondary"} />
            <NavLink to="/orders-list" className={({ isActive }) => (isActive ? `${styles.headerTextActive}` : `${styles.headerText}`)}>
              Лента заказов
            </NavLink>
          </section>
          <section className="flex ml-56 mr-80">
            <Link to="/">
              <Logo />
            </Link>
          </section>
          <section className="flex gap-2 mr-10">
            <ProfileIcon type={location.pathname==='/profile' ? 'primary': "secondary"} />
            <NavLink to="/profile" className={({ isActive }) => (isActive ? `${styles.headerTextActive}` : `${styles.headerText}`)}>
              Личный кабинет
            </NavLink>
          </section>
        </section>
      </nav>
    </header>
  );
}
export default AppHeader;
