import styles from "./app-header.module.css";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <nav className="flex justify-center">
      <section className="flex items-center py-4">
        <section className="flex mr-12 float-right gap-2">
          <BurgerIcon type="primary"/>
          <p className={styles.headerTextActive} >Конструктор</p>
        </section>
        <section className="flex gap-2 mr-64">
          <ListIcon type="secondary" />
          <p className={styles.headerText}>Лента заказов</p>
        </section>
        <section className="flex">
          <Logo />
        </section>
        <section className="flex gap-2 ml-72">
          <ProfileIcon type="secondary" />
          <p className={styles.headerText}>Личный кабинет</p>
        </section>
      </section>
    </nav>
  );
}
export default AppHeader;
