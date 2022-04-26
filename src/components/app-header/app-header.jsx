import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";

function AppHeader() {
  return (
    <header className={styles.header}>
      <nav className="flex flex-auto justify-center">
        <section className="flex items-center py-4">
          <section className="flex gap-2 mr-6">
            <BurgerIcon type="primary" />
            <p className={styles.headerTextActive}>Конструктор</p>
          </section>
          <section className="flex gap-2">
            <ListIcon type="secondary" />
            <p className={styles.headerText}>Лента заказов</p>
          </section>
          <section className="flex ml-56 mr-80">
            <Link to="/">
              <Logo />
            </Link>
          </section>
          <section className="flex gap-2 mr-10">
            <ProfileIcon type="secondary" />
            <Link to="/profile" className={styles.headerText}>
              Личный кабинет
            </Link>
          </section>
        </section>
      </nav>
    </header>
  );
}
export default AppHeader;
