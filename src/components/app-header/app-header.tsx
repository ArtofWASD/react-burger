import React from "react";
import styles from "./app-header.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <nav className="flex justify-center">
      <section className="flex items-center py-4">
        <section className="flex mr-5 float-right gap-1">
          <BurgerIcon type="primary"/>
          <p className={styles.headerTextActive} >Конструктор</p>
        </section>
        <section className="flex gap-1 mr-56">
          <ListIcon type="secondary" />
          <p className={styles.headerText}>Лента заказов</p>
        </section>
        <section className="flex">
          <Logo />
        </section>
        <section className="flex gap-1 ml-96">
          <ProfileIcon type="secondary" />
          <p className={styles.headerText}>Личный кабинет</p>
        </section>
      </section>
    </nav>
  );
}

export default AppHeader;
