import React from "react";
import "./AppHeader.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function AppHeader() {
  return (
    <nav className="flex justify-center">
      <section className="flex items-center py-4">
        <section className="flex mr-5 float-right">
          <BurgerIcon type="primary" />
          <p className="px-2 header-text_active">Конструктор</p>
        </section>
        <section className="flex mr-56">
          <ListIcon type="secondary" />
          <p className="px-2 header-text">Лента заказов</p>
        </section>
        <section className="flex">
          <Logo />
        </section>
        <section className="flex ml-96">
          <ProfileIcon type="secondary" />
          <p className="px-2 header-text">Личный кабинет</p>
        </section>
      </section>
    </nav>
  );
}

export default AppHeader;
